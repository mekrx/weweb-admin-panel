<template>
  <div class="admin-panel" :style="cssVars">
    <div v-if="!supabase" class="setup-notice">
      <div class="setup-card">
        <div class="setup-icon">⚙</div>
        <div class="setup-title">Admin Panel</div>
        <div class="setup-text">Podaj Supabase URL i Anon Key w ustawieniach komponentu (panel po prawej w edytorze WeWeb)</div>
      </div>
    </div>

    <template v-else>
      <div class="layout">
        <!-- Sidebar -->
        <nav class="sidebar">
          <div class="sidebar-brand">
            <div class="brand-text">FBA Admin</div>
            <div class="brand-sub">v2 Panel</div>
          </div>
          <div class="nav-items">
            <button v-for="item in navItems" :key="item.id"
              class="nav-btn" :class="{ active: activePage === item.id }"
              @click="activePage = item.id">
              <span class="nav-icon">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </nav>

        <!-- Main content area -->
        <main class="main-content">

          <!-- LOADING STATE -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <div class="loading-text">Ładowanie...</div>
          </div>

          <!-- ==================== DASHBOARD ==================== -->
          <div v-else-if="activePage === 'dashboard'" class="page" key="dashboard">
            <h1 class="page-title">Dashboard</h1>
            <div class="stats-row">
              <div class="stat-card" v-for="s in dashboardCards" :key="s.label">
                <div class="stat-accent" :style="{ background: s.color }"></div>
                <div class="stat-value">{{ s.value }}</div>
                <div class="stat-label">{{ s.label }}</div>
              </div>
            </div>
            <div class="grid-2">
              <div class="card">
                <div class="card-title">Rozkład ról</div>
                <div v-for="r in (stats.roles_distribution || [])" :key="r.role" class="role-bar-row">
                  <span class="role-badge" :style="getRoleBadgeStyle(r.role)">{{ r.role }}</span>
                  <div class="bar-track"><div class="bar-fill" :style="{ width: ((r.count / Math.max(stats.total_managers, 1)) * 100) + '%' }"></div></div>
                  <span class="bar-count">{{ r.count }}</span>
                </div>
              </div>
              <div class="card">
                <div class="card-title">Oddziały</div>
                <div v-for="d in (stats.departments || [])" :key="d.id" class="dept-row">
                  <span>{{ d.name }}</span>
                  <span class="mono muted">{{ d.clients }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== USERS ==================== -->
          <div v-else-if="activePage === 'users'" class="page" key="users">
            <h1 class="page-title">Użytkownicy</h1>
            <div class="toolbar">
              <input class="search-input" v-model="searchQuery" placeholder="Szukaj po nazwisku lub email..." />
              <select class="filter-select" v-model="filterRole">
                <option value="">Wszystkie role</option>
                <option v-for="r in allRoles" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>
            <div class="card no-pad">
              <div class="table-header">
                <span class="col-user">Użytkownik</span>
                <span class="col-roles">Role</span>
                <span class="col-dept">Oddział</span>
                <span class="col-clients">Klienci</span>
                <span class="col-status">Status</span>
              </div>
              <div v-for="u in filteredUsers" :key="u.id"
                class="table-row" :class="{ selected: selectedUser && selectedUser.id === u.id }"
                @click="openUserDetail(u)">
                <div class="col-user">
                  <div class="user-name">
                    {{ u.full_name }}
                    <span v-if="u.is_super_admin" class="badge-sa">SA</span>
                    <span v-if="u.on_vacation" class="badge-vacation">URLOP</span>
                  </div>
                  <div class="user-email">{{ u.email }}</div>
                </div>
                <div class="col-roles">
                  <span v-for="r in (u.roles || []).slice(0, 3)" :key="r" class="role-badge-sm" :style="getRoleBadgeStyle(r)">{{ r }}</span>
                  <span v-if="(u.roles || []).length > 3" class="more-roles">+{{ u.roles.length - 3 }}</span>
                </div>
                <div class="col-dept muted">{{ u.oddzial || '—' }}</div>
                <div class="col-clients mono">{{ u.visible_clients_count }}</div>
                <div class="col-status"><span class="status-dot" :class="'status-' + u.status"></span></div>
              </div>
              <div v-if="filteredUsers.length === 0" class="empty-state">Brak wyników</div>
            </div>
          </div>

          <!-- ==================== ROLES ==================== -->
          <div v-else-if="activePage === 'roles'" class="page" key="roles">
            <div class="page-title-row">
              <h1 class="page-title">Role i szablony</h1>
              <button v-if="capabilities.can_create_roles" class="btn-primary" @click="showCreateRole = true">+ Nowa rola</button>
            </div>
            <p class="page-subtitle">Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.</p>
            <div v-for="role in rolesWithTemplates" :key="role.name" class="card" style="margin-bottom: 12px">
              <div class="role-card-header">
                <span class="role-badge" :style="getRoleBadgeStyle(role.name)">{{ role.name }}</span>
                <span class="muted small">{{ role.users_count }} użytk.</span>
                <button v-if="capabilities.can_create_roles" class="btn-icon-danger" @click="deleteRole(role.name)" title="Usuń rolę">✕</button>
              </div>
              <div class="template-table" v-if="role.templates && role.templates.length">
                <div v-for="(t, i) in role.templates" :key="t.table_name" class="template-row" :class="{ last: i === role.templates.length - 1 }">
                  <span class="mono">{{ t.table_name }}</span>
                  <div class="actions-group">
                    <span v-for="a in t.actions" :key="a" class="action-badge" :class="'action-' + a">{{ a }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state small">Brak szablonów uprawnień</div>
            </div>
          </div>

          <!-- ==================== AUDIT ==================== -->
          <div v-else-if="activePage === 'audit'" class="page" key="audit">
            <h1 class="page-title">Audyt zmian</h1>
            <div class="toolbar">
              <select class="filter-select" v-model="auditTableFilter">
                <option value="">Wszystkie tabele</option>
                <option v-for="t in auditTables" :key="t" :value="t">{{ t }}</option>
              </select>
              <input class="search-input" v-model="auditUserFilter" placeholder="Email użytkownika..." />
              <button class="btn-secondary" @click="loadAudit">Odśwież</button>
            </div>
            <div class="card no-pad">
              <div v-for="(a, i) in auditLogs" :key="a.id" class="audit-row" :class="{ last: i === auditLogs.length - 1 }">
                <div class="audit-top">
                  <div class="audit-left">
                    <span class="audit-table">{{ a.table_name }}</span>
                    <span class="mono muted small">#{{ (a.entity_id || '').substring(0, 8) }}</span>
                  </div>
                  <span class="muted small">{{ formatDate(a.created_at) }}</span>
                </div>
                <div class="audit-desc">{{ a.description }}</div>
                <div class="muted small">przez {{ a.user_email }}</div>
              </div>
              <div v-if="auditLogs.length === 0" class="empty-state">Brak wpisów</div>
            </div>
          </div>

          <!-- ==================== TEMP GRANTS ==================== -->
          <div v-else-if="activePage === 'temp'" class="page" key="temp">
            <h1 class="page-title">Tymczasowe uprawnienia</h1>
            <div class="card no-pad">
              <div v-for="(g, i) in tempGrants" :key="g.id" class="audit-row" :class="{ last: i === tempGrants.length - 1 }">
                <div class="audit-top">
                  <div class="audit-left">
                    <span class="role-badge-sm" :style="g.grant_type === 'role' ? getRoleBadgeStyle(g.role_name) : {}">
                      {{ g.grant_type === 'role' ? g.role_name : g.oddzial_name }}
                    </span>
                    <span class="muted small">{{ g.grant_type }}</span>
                  </div>
                  <span class="temp-countdown" :class="{ urgent: isUrgent(g.expires_at) }">{{ formatTimeRemaining(g.time_remaining) }}</span>
                </div>
                <div class="muted small">Nadane przez: {{ g.created_by }} {{ g.reason ? '— ' + g.reason : '' }}</div>
              </div>
              <div v-if="tempGrants.length === 0" class="empty-state">Brak aktywnych tymczasowych uprawnień</div>
            </div>
          </div>

        </main>
      </div>

      <!-- ==================== USER DETAIL PANEL ==================== -->
      <div v-if="selectedUser" class="overlay" @click.self="selectedUser = null">
        <div class="detail-panel">
          <div class="detail-header">
            <div>
              <div class="detail-name">
                {{ selectedUser.full_name }}
                <span v-if="selectedUser.is_super_admin" class="badge-sa">SA</span>
              </div>
              <div class="muted small">{{ selectedUser.email }}</div>
              <div class="muted small">Oddział: {{ selectedUser.oddzial || '—' }}</div>
            </div>
            <button class="btn-close" @click="selectedUser = null">✕</button>
          </div>
          <div class="detail-actions">
            <button class="btn-primary" @click="showCopyModal = true">Kopiuj uprawnienia na...</button>
            <button class="btn-secondary" @click="showAddRoleModal = true">+ Dodaj rolę</button>
            <button v-if="capabilities.can_grant_temporary" class="btn-secondary" @click="showTempGrantModal = true">⏱ Tymczasowy dostęp</button>
          </div>
          <div class="detail-tabs">
            <button v-for="t in detailTabs" :key="t.id" class="tab-btn" :class="{ active: activeDetailTab === t.id }" @click="activeDetailTab = t.id">{{ t.label }}</button>
          </div>
          <div class="detail-body">
            <!-- Roles tab -->
            <div v-if="activeDetailTab === 'roles'">
              <div class="section-label">Przypisane role</div>
              <div class="roles-wrap">
                <span v-for="r in (selectedUser.roles || [])" :key="r" class="role-badge" :style="getRoleBadgeStyle(r)">
                  {{ r }}
                  <button class="role-remove" @click="removeRole(selectedUser.id, r)">✕</button>
                </span>
                <span v-if="!(selectedUser.roles || []).length" class="muted small">Brak ról</span>
              </div>
              <div class="section-label" style="margin-top: 20px">
                Uprawnienia
                <span v-if="selectedUser.is_auto_generated" class="auto-tag">auto z ról</span>
              </div>
              <div class="perms-list">
                <div v-for="(actions, table) in (selectedUser.permissions || {})" :key="table" class="perm-row">
                  <span class="mono">{{ table }}</span>
                  <div class="actions-group">
                    <span v-for="a in (Array.isArray(actions) ? actions : [actions])" :key="a" class="action-badge" :class="'action-' + a">{{ a }}</span>
                  </div>
                </div>
                <div v-if="Object.keys(selectedUser.permissions || {}).length === 0" class="empty-state small">Super admin — pełny dostęp</div>
              </div>
            </div>
            <!-- Visibility tab -->
            <div v-if="activeDetailTab === 'visibility'">
              <div class="big-number">{{ selectedUser.visible_clients_count }}</div>
              <div class="muted center-text">widocznych klientów</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== ADD ROLE MODAL ==================== -->
      <div v-if="showAddRoleModal && selectedUser" class="overlay" @click.self="showAddRoleModal = false">
        <div class="modal">
          <div class="modal-title">Dodaj rolę — {{ selectedUser.full_name }}</div>
          <div class="roles-wrap">
            <span v-for="r in availableRolesForUser" :key="r" class="role-badge clickable" :style="getRoleBadgeStyle(r)" @click="assignRole(selectedUser.id, r)">{{ r }}</span>
            <span v-if="availableRolesForUser.length === 0" class="muted small">Wszystkie role przypisane</span>
          </div>
        </div>
      </div>

      <!-- ==================== COPY PERMISSIONS MODAL ==================== -->
      <div v-if="showCopyModal && selectedUser" class="overlay" @click.self="showCopyModal = false">
        <div class="modal wide">
          <!-- Step 1: Pick target -->
          <template v-if="copyStep === 1">
            <div class="modal-title">Kopiuj uprawnienia z {{ selectedUser.full_name }}</div>
            <div class="modal-subtitle">Wybierz cel</div>
            <input class="search-input" v-model="copySearch" placeholder="Szukaj użytkownika..." />
            <div v-for="u in copyTargets" :key="u.id" class="copy-target" @click="selectCopyTarget(u)">
              <div class="copy-avatar">{{ getInitials(u.full_name) }}</div>
              <div class="copy-info">
                <div class="copy-name">{{ u.full_name }}</div>
                <div class="muted small">{{ u.email }}</div>
              </div>
              <div class="copy-roles">
                <span v-for="r in (u.roles || []).slice(0, 2)" :key="r" class="role-badge-sm" :style="getRoleBadgeStyle(r)">{{ r }}</span>
              </div>
            </div>
          </template>
          <!-- Step 2: Edit & apply -->
          <template v-if="copyStep === 2">
            <div class="modal-title">Sprawdź i dostosuj</div>
            <div class="modal-subtitle">{{ selectedUser.full_name }} → {{ copyTarget.full_name }}</div>
            <div class="copy-actions-row">
              <button class="btn-secondary small" @click="copyStep = 1">← Zmień cel</button>
              <button class="btn-primary small" :class="{ modified: copyHasChanges }" @click="applyCopy">
                {{ copyHasChanges ? 'Zastosuj ze zmianami' : 'Zastosuj kopię' }}
              </button>
            </div>
            <div class="section-label">
              Role
              <span v-if="copyAddedRoles.length || copyRemovedRoles.length" class="change-tag">
                {{ copyAddedRoles.length ? '+' + copyAddedRoles.length : '' }}
                {{ copyRemovedRoles.length ? '-' + copyRemovedRoles.length : '' }}
                zmienione
              </span>
            </div>
            <div class="roles-wrap">
              <span v-for="r in allRoles" :key="r" class="role-badge clickable"
                :style="getRoleBadgeStyle(r)"
                :class="{ dimmed: !copyEditedRoles.includes(r), added: copyEditedRoles.includes(r) && !sourceRoles.includes(r), removed: !copyEditedRoles.includes(r) && sourceRoles.includes(r) }"
                @click="toggleCopyRole(r)">
                {{ r }}
                <span v-if="copyEditedRoles.includes(r) && !sourceRoles.includes(r)" class="change-dot green">+</span>
                <span v-if="!copyEditedRoles.includes(r) && sourceRoles.includes(r)" class="change-dot red">−</span>
              </span>
            </div>
            <div class="section-label" style="margin-top: 16px">
              Oddziały
              <span v-if="copyOddzialyChanged" class="change-tag">zmienione</span>
            </div>
            <div class="oddzial-actions">
              <button class="btn-xs" @click="copyEditedOddzialy = allOddzialy.map(o => o.id)">Zaznacz wszystkie</button>
              <button class="btn-xs" @click="copyEditedOddzialy = []">Wyczyść</button>
            </div>
            <div class="oddzial-grid">
              <div v-for="o in allOddzialy" :key="o.id" class="oddzial-chip" :class="{ active: copyEditedOddzialy.includes(o.id) }" @click="toggleCopyOddzial(o.id)">
                <div class="checkbox" :class="{ checked: copyEditedOddzialy.includes(o.id) }"><span v-if="copyEditedOddzialy.includes(o.id)">✓</span></div>
                {{ o.name }}
              </div>
            </div>
            <div class="copy-summary">
              <div class="section-label small">Podsumowanie</div>
              <div class="muted small">Cel: <strong>{{ copyTarget.full_name }}</strong></div>
              <div class="muted small">Role ({{ copyEditedRoles.length }}): {{ copyEditedRoles.join(', ') || 'brak' }}</div>
              <div v-if="copyAddedRoles.length" class="small green-text">+ Dodane: {{ copyAddedRoles.join(', ') }}</div>
              <div v-if="copyRemovedRoles.length" class="small red-text">− Usunięte: {{ copyRemovedRoles.join(', ') }}</div>
              <div class="muted small">Oddziały: {{ copyEditedOddzialy.length }} z {{ allOddzialy.length }}</div>
            </div>
          </template>
        </div>
      </div>

      <!-- ==================== TEMP GRANT MODAL ==================== -->
      <div v-if="showTempGrantModal && selectedUser" class="overlay" @click.self="showTempGrantModal = false">
        <div class="modal">
          <div class="modal-title">Tymczasowy dostęp — {{ selectedUser.full_name }}</div>
          <div class="section-label">Typ</div>
          <div class="toggle-row">
            <button class="btn-toggle" :class="{ active: tempGrantType === 'role' }" @click="tempGrantType = 'role'">Rola</button>
            <button class="btn-toggle" :class="{ active: tempGrantType === 'oddzial' }" @click="tempGrantType = 'oddzial'">Oddział</button>
          </div>
          <div v-if="tempGrantType === 'role'" class="section-label">Wybierz rolę</div>
          <div v-if="tempGrantType === 'role'" class="roles-wrap">
            <span v-for="r in allRoles" :key="r" class="role-badge clickable" :style="getRoleBadgeStyle(r)" :class="{ active: tempGrantRole === r }" @click="tempGrantRole = r">{{ r }}</span>
          </div>
          <div v-if="tempGrantType === 'oddzial'" class="section-label">Wybierz oddziały</div>
          <div v-if="tempGrantType === 'oddzial'" class="oddzial-grid">
            <div v-for="o in allOddzialy" :key="o.id" class="oddzial-chip" :class="{ active: tempGrantOddzialy.includes(o.id) }" @click="toggleTempOddzial(o.id)">
              <div class="checkbox" :class="{ checked: tempGrantOddzialy.includes(o.id) }"><span v-if="tempGrantOddzialy.includes(o.id)">✓</span></div>
              {{ o.name }}
            </div>
          </div>
          <div class="section-label">Wygasa (czas polski)</div>
          <input type="datetime-local" class="search-input" v-model="tempGrantExpiry" />
          <div class="section-label">Powód (opcjonalnie)</div>
          <input class="search-input" v-model="tempGrantReason" placeholder="np. zastępstwo za..." />
          <button class="btn-primary" style="margin-top: 16px; width: 100%" @click="applyTempGrant" :disabled="!canApplyTempGrant">Nadaj tymczasowy dostęp</button>
        </div>
      </div>

      <!-- ==================== CREATE ROLE MODAL ==================== -->
      <div v-if="showCreateRole" class="overlay" @click.self="showCreateRole = false">
        <div class="modal">
          <div class="modal-title">Nowa rola</div>
          <input class="search-input" v-model="newRoleName" placeholder="Nazwa roli (np. rekrutacja)..." />
          <button class="btn-primary" style="margin-top: 12px; width: 100%" @click="createRole" :disabled="!newRoleName.trim()">Utwórz rolę</button>
        </div>
      </div>

      <!-- TOAST -->
      <div v-if="toast" class="toast" :class="toast.type">{{ toast.message }}</div>
    </template>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

const ROLE_COLORS = {
  admin: { bg: '#1a1a2e', fg: '#e0e0ff' }, dyrektor: { bg: '#2d1b4e', fg: '#d4b8ff' },
  wicedyrektor: { bg: '#3a1f5e', fg: '#d4b8ff' }, teamlead: { bg: '#1b3a4e', fg: '#b8e0ff' },
  koordynator: { bg: '#1b4e3a', fg: '#b8ffd4' }, hr: { bg: '#4e1b3a', fg: '#ffb8d4' },
  legalizacja: { bg: '#4e3a1b', fg: '#ffd4b8' }, archiwizacja: { bg: '#3a4e1b', fg: '#d4ffb8' },
  korespondencja: { bg: '#1b4e4e', fg: '#b8ffff' }, kontroling: { bg: '#4e4e1b', fg: '#ffffb8' },
  onboarding: { bg: '#1b2e4e', fg: '#b8d4ff' },
};

export default {
  props: {
    content: { type: Object, required: true }
  },
  data() {
    return {
      supabase: null,
      loading: true,
      activePage: 'dashboard',
      activeDetailTab: 'roles',
      searchQuery: '',
      filterRole: '',

      // Data
      stats: {},
      users: [],
      rolesWithTemplates: [],
      allRoles: [],
      allOddzialy: [],
      auditLogs: [],
      tempGrants: [],
      capabilities: {},

      // UI state
      selectedUser: null,
      showAddRoleModal: false,
      showCopyModal: false,
      showTempGrantModal: false,
      showCreateRole: false,
      toast: null,

      // Audit filters
      auditTableFilter: '',
      auditUserFilter: '',
      auditTables: ['archiwum','oplaty','managers','users_roles','user_permissions','vacations','korespondencja','change_logs','role_permissions','super_admins'],

      // Copy modal state
      copyStep: 1,
      copySearch: '',
      copyTarget: null,
      copyEditedRoles: [],
      copyEditedOddzialy: [],

      // Temp grant modal state
      tempGrantType: 'role',
      tempGrantRole: '',
      tempGrantOddzialy: [],
      tempGrantExpiry: '',
      tempGrantReason: '',

      // Create role
      newRoleName: '',
    };
  },
  computed: {
    cssVars() {
      return {
        '--accent': this.content.accentColor || '#6366f1',
        '--bg': this.content.bgColor || '#0f0f0f',
        '--card-bg': this.content.cardBgColor || '#1c1c1c',
        '--border': this.content.borderColor || '#2a2a28',
        '--text': this.content.textColor || '#e8e6e1',
        '--text-muted': this.content.textMutedColor || '#8a8880',
      };
    },
    navItems() {
      const items = [
        { id: 'dashboard', label: 'Dashboard', icon: '◈' },
        { id: 'users', label: 'Użytkownicy', icon: '◎' },
        { id: 'roles', label: 'Role', icon: '◇' },
        { id: 'audit', label: 'Audyt', icon: '◫' },
        { id: 'temp', label: 'Tymczasowe', icon: '⏱' },
      ];
      if (!this.capabilities.can_view_audit) return items.filter(i => i.id !== 'audit');
      return items;
    },
    detailTabs() {
      return [
        { id: 'roles', label: 'Role' },
        { id: 'visibility', label: 'Widoczność' },
      ];
    },
    dashboardCards() {
      return [
        { value: this.stats.total_managers || 0, label: 'Aktywni menedżerowie', color: '#22c55e' },
        { value: this.stats.active_clients || 0, label: 'Aktywni klienci', color: '#6366f1' },
        { value: this.stats.on_vacation_now || 0, label: 'Na urlopie', color: '#f59e0b' },
        { value: this.stats.pending_vacations || 0, label: 'Oczekujące urlopy', color: '#ef4444' },
        { value: this.stats.recent_changes_24h || 0, label: 'Zmiany 24h', color: '#8b5cf6' },
      ];
    },
    filteredUsers() {
      return this.users.filter(u => {
        const s = !this.searchQuery || u.full_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || u.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const r = !this.filterRole || (u.roles || []).includes(this.filterRole);
        return s && r;
      });
    },
    availableRolesForUser() {
      if (!this.selectedUser) return [];
      return this.allRoles.filter(r => !(this.selectedUser.roles || []).includes(r));
    },
    copyTargets() {
      if (!this.selectedUser) return [];
      return this.users.filter(u => u.id !== this.selectedUser.id && (!this.copySearch || u.full_name.toLowerCase().includes(this.copySearch.toLowerCase()) || u.email.toLowerCase().includes(this.copySearch.toLowerCase())));
    },
    sourceRoles() {
      return this.selectedUser ? (this.selectedUser.roles || []) : [];
    },
    copyAddedRoles() {
      return this.copyEditedRoles.filter(r => !this.sourceRoles.includes(r));
    },
    copyRemovedRoles() {
      return this.sourceRoles.filter(r => !this.copyEditedRoles.includes(r));
    },
    copyOddzialyChanged() {
      const sourceOddzialy = this.selectedUser?.allowed_oddzial_ids || [];
      const sourceSet = [...sourceOddzialy].sort().join(',');
      const editedSet = [...this.copyEditedOddzialy].sort().join(',');
      return sourceSet !== editedSet;
    },
    copyHasChanges() {
      return this.copyAddedRoles.length > 0 || this.copyRemovedRoles.length > 0 || this.copyOddzialyChanged;
    },
    canApplyTempGrant() {
      if (!this.tempGrantExpiry) return false;
      if (this.tempGrantType === 'role' && !this.tempGrantRole) return false;
      if (this.tempGrantType === 'oddzial' && this.tempGrantOddzialy.length === 0) return false;
      return true;
    },
  },
  watch: {
    'content.supabaseUrl'() { this.initSupabase(); },
    'content.supabaseAnonKey'() { this.initSupabase(); },
    activePage(page) {
      if (page === 'audit') this.loadAudit();
      if (page === 'temp') this.loadTempGrants();
      if (page === 'roles') this.loadRoles();
    }
  },
  mounted() {
    this.initSupabase();
  },
  methods: {
    async initSupabase() {
      const url = this.content.supabaseUrl;
      const key = this.content.supabaseAnonKey;
      if (!url || !key) { this.supabase = null; return; }
      try {
        this.supabase = createClient(url, key);
        await this.loadInitialData();
      } catch (e) {
        console.error('Supabase init error:', e);
        this.showToast('Błąd połączenia z Supabase', 'error');
      }
    },
    async loadInitialData() {
      this.loading = true;
      try {
        const [statsRes, usersRes, capsRes, rolesRes, oddzialyRes] = await Promise.all([
          this.supabase.rpc('admin_dashboard_stats'),
          this.supabase.rpc('get_admin_users_overview'),
          this.supabase.rpc('admin_get_my_capabilities'),
          this.supabase.rpc('admin_get_roles_with_templates'),
          this.supabase.from('oddzialy').select('id, oddzial').order('oddzial'),
        ]);
        this.stats = statsRes.data || {};
        this.users = usersRes.data || [];
        this.capabilities = capsRes.data || {};
        this.rolesWithTemplates = rolesRes.data || [];
        this.allRoles = this.rolesWithTemplates.map(r => r.name);
        this.allOddzialy = (oddzialyRes.data || []).map(o => ({ id: o.id, name: o.oddzial }));
      } catch (e) {
        console.error('Load error:', e);
        this.showToast('Błąd ładowania danych', 'error');
      }
      this.loading = false;
    },
    async loadAudit() {
      const { data } = await this.supabase.rpc('admin_get_audit_trail', {
        p_table_name: this.auditTableFilter || null,
        p_user_email: this.auditUserFilter || null,
        p_limit: 100,
      });
      this.auditLogs = data?.records || [];
    },
    async loadTempGrants() {
      const { data } = await this.supabase.rpc('admin_get_temporary_grants');
      this.tempGrants = data || [];
    },
    async loadRoles() {
      const { data } = await this.supabase.rpc('admin_get_roles_with_templates');
      this.rolesWithTemplates = data || [];
      this.allRoles = this.rolesWithTemplates.map(r => r.name);
    },
    openUserDetail(user) {
      this.selectedUser = user;
      this.activeDetailTab = 'roles';
    },
    async assignRole(userId, roleName) {
      const { error } = await this.supabase.rpc('admin_assign_role', { p_user_id: userId, p_role_name: roleName });
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast(`Rola ${roleName} przypisana`, 'success');
      this.showAddRoleModal = false;
      await this.loadInitialData();
      this.selectedUser = this.users.find(u => u.id === userId) || null;
    },
    async removeRole(userId, roleName) {
      const { error } = await this.supabase.rpc('admin_remove_role', { p_user_id: userId, p_role_name: roleName });
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast(`Rola ${roleName} usunięta`, 'success');
      await this.loadInitialData();
      this.selectedUser = this.users.find(u => u.id === userId) || null;
    },
    async createRole() {
      const { error } = await this.supabase.rpc('admin_create_role', { p_role_name: this.newRoleName.trim() });
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast(`Rola "${this.newRoleName}" utworzona`, 'success');
      this.showCreateRole = false;
      this.newRoleName = '';
      await this.loadRoles();
    },
    async deleteRole(roleName) {
      if (!confirm(`Usunąć rolę "${roleName}"? To usunie ją od wszystkich użytkowników.`)) return;
      const { error } = await this.supabase.rpc('admin_delete_role', { p_role_name: roleName });
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast(`Rola "${roleName}" usunięta`, 'success');
      await this.loadRoles();
    },
    // Copy modal
    selectCopyTarget(user) {
      this.copyTarget = user;
      this.copyEditedRoles = [...this.sourceRoles];
      const sourceOddzialy = this.selectedUser?.allowed_oddzial_ids;
      this.copyEditedOddzialy = sourceOddzialy === null ? this.allOddzialy.map(o => o.id) : [...(sourceOddzialy || [])];
      this.copyStep = 2;
    },
    toggleCopyRole(role) {
      const idx = this.copyEditedRoles.indexOf(role);
      if (idx > -1) this.copyEditedRoles.splice(idx, 1);
      else this.copyEditedRoles.push(role);
    },
    toggleCopyOddzial(id) {
      const idx = this.copyEditedOddzialy.indexOf(id);
      if (idx > -1) this.copyEditedOddzialy.splice(idx, 1);
      else this.copyEditedOddzialy.push(id);
    },
    async applyCopy() {
      const params = {
        p_from_user_id: this.selectedUser.id,
        p_to_user_id: this.copyTarget.id,
        p_copy_roles: true,
        p_copy_oddzialy: !this.copyOddzialyChanged,
        p_add_roles: this.copyAddedRoles.length ? this.copyAddedRoles : null,
        p_remove_roles: this.copyRemovedRoles.length ? this.copyRemovedRoles : null,
        p_override_oddzialy: this.copyOddzialyChanged ? this.copyEditedOddzialy : null,
      };
      const { error } = await this.supabase.rpc('admin_copy_permissions', params);
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast(`Uprawnienia skopiowane do ${this.copyTarget.full_name}`, 'success');
      this.showCopyModal = false;
      this.copyStep = 1;
      await this.loadInitialData();
    },
    // Temp grants
    toggleTempOddzial(id) {
      const idx = this.tempGrantOddzialy.indexOf(id);
      if (idx > -1) this.tempGrantOddzialy.splice(idx, 1);
      else this.tempGrantOddzialy.push(id);
    },
    async applyTempGrant() {
      const expiresAt = new Date(this.tempGrantExpiry).toISOString();
      let error;
      if (this.tempGrantType === 'role') {
        ({ error } = await this.supabase.rpc('admin_grant_temporary_role', {
          p_user_id: this.selectedUser.id, p_role_name: this.tempGrantRole,
          p_expires_at: expiresAt, p_reason: this.tempGrantReason || null,
        }));
      } else {
        ({ error } = await this.supabase.rpc('admin_grant_temporary_oddzial', {
          p_user_id: this.selectedUser.id, p_oddzial_ids: this.tempGrantOddzialy,
          p_expires_at: expiresAt, p_reason: this.tempGrantReason || null,
        }));
      }
      if (error) { this.showToast(error.message, 'error'); return; }
      this.showToast('Tymczasowy dostęp nadany', 'success');
      this.showTempGrantModal = false;
      this.tempGrantRole = '';
      this.tempGrantOddzialy = [];
      this.tempGrantExpiry = '';
      this.tempGrantReason = '';
      await this.loadInitialData();
    },
    // Helpers
    getRoleBadgeStyle(role) {
      const c = ROLE_COLORS[role] || { bg: '#333', fg: '#ccc' };
      return { backgroundColor: c.bg, color: c.fg };
    },
    getInitials(name) {
      return (name || '').split(' ').map(w => w[0]).join('').substring(0, 2);
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleString('pl-PL');
    },
    formatTimeRemaining(interval) {
      if (!interval) return '—';
      const str = String(interval);
      const match = str.match(/(\d+)\s*days?\s*(\d+):(\d+)/);
      if (match) return `${match[1]}d ${match[2]}h ${match[3]}m`;
      const hm = str.match(/(\d+):(\d+):(\d+)/);
      if (hm) return `${hm[1]}h ${hm[2]}m`;
      return str;
    },
    isUrgent(expiresAt) {
      if (!expiresAt) return false;
      return new Date(expiresAt) - new Date() < 3600000;
    },
    showToast(message, type = 'info') {
      this.toast = { message, type };
      setTimeout(() => { this.toast = null; }, 3000);
    },
  }
};
</script>

<style scoped>
.admin-panel { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--text); background: var(--bg); min-height: 100vh; position: relative; }

/* Setup notice */
.setup-notice { display: flex; align-items: center; justify-content: center; min-height: 400px; }
.setup-card { text-align: center; padding: 40px; border: 1px dashed var(--border); border-radius: 12px; max-width: 400px; }
.setup-icon { font-size: 32px; margin-bottom: 12px; }
.setup-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.setup-text { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* Layout */
.layout { display: flex; min-height: 100vh; }
.sidebar { width: 210px; border-right: 1px solid var(--border); padding: 20px 0; display: flex; flex-direction: column; flex-shrink: 0; background: var(--card-bg); }
.sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
.brand-text { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
.brand-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
.nav-items { padding: 12px 8px; flex: 1; }
.nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; background: transparent; border: none; border-radius: 8px; cursor: pointer; color: var(--text-muted); font-size: 13px; text-align: left; transition: all 0.15s; }
.nav-btn:hover { background: rgba(99,102,241,0.06); }
.nav-btn.active { background: rgba(99,102,241,0.12); color: var(--accent); font-weight: 600; }
.nav-icon { font-size: 15px; opacity: 0.7; }
.main-content { flex: 1; overflow: auto; }

/* Pages */
.page { padding: 32px; max-width: 1100px; animation: fadeIn 0.25s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.page-title { font-size: 24px; font-weight: 700; margin: 0 0 24px; }
.page-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.page-subtitle { font-size: 13px; color: var(--text-muted); margin: 0 0 24px; }

/* Stats */
.stats-row { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
.stat-card { padding: 20px 16px; border-radius: 12px; background: var(--card-bg); border: 1px solid var(--border); min-width: 120px; flex: 1; position: relative; overflow: hidden; }
.stat-accent { position: absolute; top: 0; left: 0; width: 3px; height: 100%; border-radius: 12px 0 0 12px; }
.stat-value { font-size: 28px; font-weight: 700; letter-spacing: -1px; }
.stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 500; }

/* Grid */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* Card */
.card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; }
.card.no-pad { padding: 0; }
.card-title { font-size: 14px; font-weight: 600; margin-bottom: 16px; }

/* Role bars */
.role-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.bar-track { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.bar-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.5s; }
.bar-count { font-size: 12px; color: var(--text-muted); font-family: monospace; min-width: 20px; text-align: right; }

/* Dept rows */
.dept-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 13px; }

/* Toolbar */
.toolbar { display: flex; gap: 12px; margin-bottom: 20px; }
.search-input { flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text); font-size: 13px; outline: none; }
.search-input:focus { border-color: var(--accent); }
.filter-select { padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text); font-size: 13px; outline: none; }

/* Table */
.table-header { display: grid; grid-template-columns: 1fr 160px 100px 80px 60px; padding: 10px 16px; font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1px solid var(--border); }
.table-row { display: grid; grid-template-columns: 1fr 160px 100px 80px 60px; align-items: center; padding: 12px 16px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.12s; }
.table-row:hover { background: rgba(99,102,241,0.06); }
.table-row.selected { background: rgba(99,102,241,0.12); }
.user-name { font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.user-email { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

/* Badges */
.badge-sa { font-size: 9px; background: #f59e0b; color: #000; padding: 1px 6px; border-radius: 10px; font-weight: 700; }
.badge-vacation { font-size: 9px; background: #6366f1; color: #fff; padding: 1px 6px; border-radius: 10px; font-weight: 700; }
.role-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; position: relative; }
.role-badge-sm { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
.role-badge.clickable { cursor: pointer; transition: transform 0.1s, opacity 0.15s; border: 1px solid transparent; }
.role-badge.clickable:hover { transform: scale(1.08); }
.role-badge.dimmed { opacity: 0.3; border: 1px dashed rgba(255,255,255,0.15); }
.role-remove { background: none; border: none; color: inherit; cursor: pointer; padding: 0; font-size: 13px; line-height: 1; margin-left: 4px; opacity: 0.6; }
.more-roles { font-size: 11px; color: var(--text-muted); }

/* Change indicators */
.change-dot { position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; box-shadow: 0 0 0 2px var(--bg); }
.change-dot.green { background: #22c55e; color: #fff; }
.change-dot.red { background: #ef4444; color: #fff; }
.change-tag { font-size: 10px; background: rgba(245,158,11,0.15); color: #f59e0b; padding: 2px 8px; border-radius: 10px; font-weight: 400; margin-left: 8px; }

/* Action badges */
.action-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; text-transform: uppercase; }
.action-select { background: #1b3a4e; color: #b8e0ff; }
.action-insert { background: #1b4e3a; color: #b8ffd4; }
.action-update { background: #4e3a1b; color: #ffd4b8; }
.action-delete { background: #4e1b1b; color: #ffb8b8; }
.action-all { background: #2d1b4e; color: #d4b8ff; }
.actions-group { display: flex; gap: 4px; }

/* Status */
.status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.status-active { background: #22c55e; }
.status-terminated { background: #ef4444; }
.status-inactive { background: #eab308; }

/* Permissions list */
.perms-list { background: var(--card-bg); border-radius: 8px; border: 1px solid var(--border); overflow: hidden; }
.perm-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.02); }
.perm-row:last-child { border-bottom: none; }

/* Template table */
.template-table { border-radius: 8px; border: 1px solid rgba(255,255,255,0.04); overflow: hidden; }
.template-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.template-row.last { border-bottom: none; }

/* Role card header */
.role-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.btn-icon-danger { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; margin-left: auto; opacity: 0.5; transition: opacity 0.15s; }
.btn-icon-danger:hover { opacity: 1; }

/* Audit */
.audit-row { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.02); }
.audit-row.last { border-bottom: none; }
.audit-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.audit-left { display: flex; align-items: center; gap: 8px; }
.audit-table { font-size: 11px; font-family: monospace; color: var(--accent); background: rgba(99,102,241,0.1); padding: 2px 8px; border-radius: 4px; }
.audit-desc { font-size: 13px; margin-bottom: 4px; white-space: pre-wrap; word-break: break-word; }

/* Temp countdown */
.temp-countdown { font-size: 12px; font-weight: 600; color: var(--accent); }
.temp-countdown.urgent { color: #ef4444; }

/* Overlay & Panels */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); display: flex; justify-content: flex-end; z-index: 10000; }
.detail-panel { width: 520px; height: 100%; background: var(--card-bg); border-left: 1px solid var(--border); overflow-y: auto; animation: slideIn 0.2s ease-out; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
.detail-header { padding: 24px 24px 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
.detail-name { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
.detail-actions { display: flex; gap: 8px; padding: 12px 24px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.detail-tabs { display: flex; border-bottom: 1px solid var(--border); }
.tab-btn { flex: 1; padding: 10px 0; background: none; border: none; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); border-bottom: 2px solid transparent; transition: all 0.15s; }
.tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
.detail-body { padding: 24px; }

/* Modal */
.modal { background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border); padding: 24px; width: 420px; max-height: 85vh; overflow-y: auto; margin: auto; animation: fadeIn 0.2s ease-out; }
.modal.wide { width: 560px; }
.modal-title { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.modal-subtitle { font-size: 12px; color: var(--text-muted); margin-bottom: 16px; }
.copy-actions-row { display: flex; gap: 8px; margin-bottom: 16px; }

/* Copy targets */
.copy-target { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 10px; cursor: pointer; margin-bottom: 4px; border: 1px solid var(--border); transition: all 0.12s; }
.copy-target:hover { background: rgba(99,102,241,0.06); border-color: var(--accent); }
.copy-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; }
.copy-info { flex: 1; min-width: 0; }
.copy-name { font-size: 14px; font-weight: 600; }
.copy-roles { display: flex; gap: 3px; flex-wrap: wrap; max-width: 120px; justify-content: flex-end; }

/* Oddzial grid */
.oddzial-actions { display: flex; gap: 8px; margin-bottom: 10px; }
.oddzial-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 4px; }
.oddzial-chip { padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; background: var(--card-bg); border: 1px solid var(--border); color: var(--text-muted); transition: all 0.12s; display: flex; align-items: center; gap: 6px; }
.oddzial-chip.active { background: rgba(99,102,241,0.15); border-color: var(--accent); color: #a5b4fc; }
.checkbox { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.12s; font-size: 10px; font-weight: 700; color: #fff; }
.checkbox.checked { background: var(--accent); border-color: var(--accent); }

/* Copy summary */
.copy-summary { background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid var(--border); padding: 16px; margin-top: 16px; }

/* Temp grant modal */
.toggle-row { display: flex; gap: 4px; margin-bottom: 16px; }
.btn-toggle { flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-muted); cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.15s; }
.btn-toggle.active { background: rgba(99,102,241,0.15); border-color: var(--accent); color: #a5b4fc; }

/* Buttons */
.btn-primary { padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; background: var(--accent); color: #fff; transition: opacity 0.15s; }
.btn-primary:hover { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-primary.modified { background: #f59e0b; color: #000; }
.btn-secondary { padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border); cursor: pointer; font-size: 12px; font-weight: 600; background: var(--card-bg); color: var(--text); transition: all 0.15s; }
.btn-secondary:hover { border-color: var(--accent); }
.btn-close { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 22px; padding: 4px; }
.btn-xs { padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 500; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-muted); }
.btn-primary.small, .btn-secondary.small { padding: 6px 12px; font-size: 11px; }

/* Sections & labels */
.section-label { font-size: 13px; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; }
.section-label.small { font-size: 12px; }
.auto-tag { font-size: 10px; color: var(--accent); font-weight: 400; margin-left: 8px; }
.roles-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }

/* Helpers */
.muted { color: var(--text-muted); }
.small { font-size: 12px; }
.mono { font-family: monospace; }
.center-text { text-align: center; }
.big-number { font-size: 48px; font-weight: 700; color: var(--accent); text-align: center; margin-bottom: 4px; }
.green-text { color: #22c55e; }
.red-text { color: #ef4444; }
.empty-state { padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px; }
.empty-state.small { padding: 12px; }

/* Loading */
.loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; gap: 12px; }
.spinner { width: 24px; height: 24px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text { font-size: 13px; color: var(--text-muted); }

/* Toast */
.toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; z-index: 99999; animation: fadeIn 0.2s ease-out; }
.toast.success { background: #065f46; color: #a7f3d0; }
.toast.error { background: #7f1d1d; color: #fca5a5; }
.toast.info { background: #1e3a5f; color: #93c5fd; }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
</style>
