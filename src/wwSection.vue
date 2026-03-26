<template>
  <div class="admin-panel" :style="cssVars">
    <!-- SETUP SCREEN -->
    <div v-if="!supabase" class="setup-screen">
      <div class="setup-card">
        <div style="font-size:32px;margin-bottom:12px">⚙</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:8px">Admin Panel</div>
        <div class="text-muted text-sm">Oczekiwanie na połączenie z Supabase</div>
      </div>
    </div>

    <template v-else>
      <div class="layout">
        <!-- SIDEBAR -->
        <nav v-if="content.showSidebar!==false" class="sidebar">
          <div v-if="L('labelSidebarTitle')" class="sidebar-brand">
            <div class="sidebar-name">{{L('labelSidebarTitle')}}</div>
            <div v-if="L('labelSidebarSubtitle')" class="text-muted text-sm">{{L('labelSidebarSubtitle')}}</div>
          </div>
          <div class="sidebar-nav">
            <button
              v-for="n in navItems" :key="n.id"
              class="nav-btn" :class="{active:activePage===n.id}"
              @click="activePage=n.id"
            >
              <span class="nav-icon">{{n.icon}}</span>{{n.label}}
            </button>
          </div>
        </nav>

        <!-- MAIN CONTENT -->
        <main class="main-content">
          <div v-if="loading" class="loader">
            <div class="spinner"></div>
            <div class="text-muted text-sm">Ładowanie...</div>
          </div>

          <!-- ==================== DASHBOARD ==================== -->
          <div v-else-if="activePage==='dashboard'" class="page">
            <h1 class="page-title">{{L('labelDashboard')}}</h1>
            <div class="stats-row">
              <div v-for="s in dashCards" :key="s.id" class="stat-card">
                <div class="stat-accent" :style="{background:s.c}"></div>
                <div class="stat-value">{{s.v}}</div>
                <div class="stat-label text-muted text-sm">{{s.l}}</div>
              </div>
            </div>
            <div class="grid-2col">
              <div class="card">
                <div class="card-title">{{L('labelRolesDistribution')}}</div>
                <div v-for="r in (stats.roles_distribution||[])" :key="r.role" class="role-bar-row">
                  <span class="role-badge" :style="roleBadgeStyle(r.role)">{{r.role}}</span>
                  <div class="bar-track"><div class="bar-fill" :style="{width:((r.count/Math.max(stats.total_managers,1))*100)+'%'}"></div></div>
                  <span class="bar-count mono text-muted text-sm">{{r.count}}</span>
                </div>
              </div>
              <div class="card">
                <div class="card-title">{{L('labelDepartments')}}</div>
                <div v-for="d in (stats.departments||[])" :key="d.id" class="dept-row">
                  <span>{{d.name}}</span>
                  <span class="mono text-muted text-sm">{{d.clients}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== USERS ==================== -->
          <div v-else-if="activePage==='users'" class="page">
            <h1 class="page-title">{{L('labelUsers')}}</h1>
            <div class="toolbar">
              <input class="input-field" v-model="searchQuery" :placeholder="L('labelSearch')"/>
              <select class="select-field" v-model="filterRole">
                <option value="">{{L('labelAllRoles')}}</option>
                <option v-for="r in allRoles" :key="r" :value="r">{{r}}</option>
              </select>
            </div>
            <div class="card no-pad">
              <div class="table-header">
                <span class="col-user">{{L('labelColUser')||'UŻYTKOWNIK'}}</span>
                <span class="col-roles">{{L('labelColRoles')||'ROLE'}}</span>
                <span class="col-clients">{{L('labelColClients')||'KLIENTÓW'}}</span>
                <span class="col-status">{{L('labelColStatus')||'STATUS'}}</span>
              </div>
              <div
                v-for="u in paginatedUsers" :key="u.id"
                class="table-row" :class="{selected:selectedUser&&selectedUser.id===u.id}"
                @click="openDetail(u)"
              >
                <div class="col-user">
                  <div class="user-name">
                    {{u.full_name}}
                    <span v-if="u.is_super_admin" class="badge-sa">{{L('labelSuperAdmin')||'SuperAdmin'}}</span>
                    <span v-if="u.on_vacation" class="badge-vacation">{{L('labelVacation')||'URLOP'}}</span>
                  </div>
                  <div class="user-email text-muted text-sm">{{u.email}}</div>
                  <div v-if="u.oddzial" class="user-dept text-muted text-sm">{{u.oddzial}}</div>
                </div>
                <div class="col-roles">
                  <span v-for="r in uniqueRoles(u).slice(0,3)" :key="r" class="role-badge-sm" :style="roleBadgeStyle(r)">{{r}}</span>
                  <span v-if="uniqueRoles(u).length>3" class="text-muted text-sm">+{{uniqueRoles(u).length-3}}</span>
                </div>
                <div class="col-clients mono">{{u.visible_clients_count}}</div>
                <div class="col-status">
                  <span class="status-dot" :class="'status-'+u.status"></span>
                  <span class="status-text text-sm" :class="'status-text-'+u.status">{{statusLabel(u.status)}}</span>
                </div>
              </div>
              <div v-if="filteredUsers.length===0" class="empty-state">{{L('labelNoResults')||'Brak wyników'}}</div>
            </div>
            <!-- PAGINATION -->
            <div v-if="totalPages>1" class="pagination">
              <button class="btn-ghost" :disabled="currentPage<=1" @click="currentPage--">← {{L('labelPrev')}}</button>
              <span class="text-muted text-sm">{{currentPage}} / {{totalPages}}</span>
              <button class="btn-ghost" :disabled="currentPage>=totalPages" @click="currentPage++">{{L('labelNext')}} →</button>
            </div>
          </div>

          <!-- ==================== ROLES ==================== -->
          <div v-else-if="activePage==='roles'" class="page">
            <div class="page-title-row">
              <h1 class="page-title">{{L('labelRoles')}}</h1>
              <button v-if="cap.can_create_roles" class="btn-primary" @click="showCreateRole=true">{{L('labelBtnNewRole')}}</button>
            </div>
            <p class="text-muted text-sm margin-b-lg">{{L('labelRolesHint')}}</p>
            <div v-for="rl in rolesWithTemplates" :key="rl.name" class="card margin-b-sm">
              <div class="role-card-header">
                <span class="role-badge" :style="roleBadgeStyle(rl.name)">{{rl.name}}</span>
                <span class="text-muted text-sm">{{rl.users_count}} {{L('labelUsersCount')}}</span>
                <div class="role-card-actions">
                  <button v-if="cap.can_create_roles" class="btn-ghost text-sm" @click="openEditRole(rl)">✎ {{L('labelBtnEditRole')}}</button>
                  <button v-if="cap.can_create_roles" class="btn-icon-danger" @click="confirmAction('deleteRole',rl.name)">✕</button>
                </div>
              </div>
              <div v-if="rl.templates&&rl.templates.length" class="templates-table">
                <div v-for="(t,i) in rl.templates" :key="t.table_name" class="template-row" :class="{last:i===rl.templates.length-1}">
                  <span class="mono">{{t.table_name}}</span>
                  <div class="actions-group">
                    <span v-for="a in t.actions" :key="a" class="action-badge" :class="'action-'+a">{{a}}</span>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state text-sm">{{L('labelNoTemplates')}}</div>
            </div>
          </div>

          <!-- ==================== AUDIT ==================== -->
          <div v-else-if="activePage==='audit'" class="page">
            <h1 class="page-title">{{L('labelAudit')}}</h1>
            <div class="toolbar">
              <select class="select-field" v-model="auditFilter" @change="loadAudit">
                <option value="">{{L('labelAuditAllTables')}}</option>
                <option v-for="t in auditTables" :key="t" :value="t">{{t}}</option>
              </select>
              <input class="input-field" v-model="auditUser" :placeholder="L('labelAuditEmailPlaceholder')" @input="debounceAudit"/>
            </div>
            <div class="card no-pad">
              <div v-for="(a,i) in auditLogs" :key="a.id" class="audit-row" :class="{last:i===auditLogs.length-1}">
                <div class="audit-top">
                  <div class="audit-left">
                    <span class="audit-table-badge">{{a.table_label||a.table_name}}</span>
                    <span v-if="a.action_type" class="action-badge" :class="'action-'+a.action_type">{{a.action_type}}</span>
                  </div>
                  <span class="text-muted text-sm">{{formatDate(a.created_at)}}</span>
                </div>
                <div class="audit-description">{{a.human_description||a.description}}</div>
                <div v-if="a.details" class="audit-details text-muted text-sm">{{a.details}}</div>
                <div class="text-muted text-sm">{{a.user_name||a.user_email}}</div>
              </div>
              <div v-if="auditLogs.length===0" class="empty-state">{{L('labelNoAuditEntries')}}</div>
            </div>
          </div>

          <!-- ==================== TEMP GRANTS ==================== -->
          <div v-else-if="activePage==='temp'" class="page">
            <h1 class="page-title">{{L('labelTemp')}}</h1>
            <div class="card no-pad">
              <div v-for="(g,i) in tempGrants" :key="g.id" class="audit-row" :class="{last:i===tempGrants.length-1}">
                <div class="audit-top">
                  <div class="audit-left">
                    <span class="role-badge-sm" :style="g.grant_type==='role'?roleBadgeStyle(g.role_name):{}">
                      {{g.grant_type==='role'?g.role_name:g.oddzial_name}}
                    </span>
                    <span class="text-muted text-sm">→ {{g.user_name}}</span>
                  </div>
                  <span class="temp-countdown" :class="{urgent:isUrgent(g.expires_at)}">{{formatTimeRemaining(g.time_remaining)}}</span>
                </div>
                <div class="text-sm text-muted">
                  {{L('labelGrantedBy')}}: {{g.created_by}}
                  <template v-if="g.reason"> — {{g.reason}}</template>
                </div>
                <div class="text-sm text-muted">{{L('labelExpiresAt')}}: {{formatDate(g.expires_at)}}</div>
                <div class="temp-grant-actions">
                  <button class="btn-ghost" @click="extendGrant(g)">{{L('labelBtnExtend')}}</button>
                  <button class="btn-ghost btn-danger" @click="confirmAction('revokeGrant',g)">{{L('labelBtnRevoke')}}</button>
                </div>
              </div>
              <div v-if="tempGrants.length===0" class="empty-state">{{L('labelNoTempGrants')}}</div>
            </div>
          </div>
        </main>
      </div>

      <!-- ==================== USER DETAIL PANEL ==================== -->
      <div v-if="selectedUser" class="overlay" @click.self="selectedUser=null">
        <div class="detail-panel">
          <div class="detail-header">
            <div>
              <div class="detail-name">
                {{selectedUser.full_name}}
                <span v-if="selectedUser.is_super_admin" class="badge-sa">SA</span>
              </div>
              <div class="text-muted text-sm">{{selectedUser.email}}</div>
              <div class="text-muted text-sm">{{L('labelDept')}}: {{selectedUser.oddzial||'—'}}</div>
              <div class="text-muted text-sm">
                {{L('labelColStatus')}}: <span class="status-text" :class="'status-text-'+selectedUser.status">{{statusLabel(selectedUser.status)}}</span>
              </div>
            </div>
            <button class="btn-close" @click="selectedUser=null">✕</button>
          </div>
          <div class="detail-actions">
            <button class="btn-primary" @click="showCopyModal=true">{{L('labelBtnCopy')}}</button>
            <button class="btn-secondary" @click="showAddRoleModal=true">{{L('labelBtnAddRole')}}</button>
            <button v-if="cap.can_grant_temporary" class="btn-secondary" @click="showTempGrantModal=true">{{L('labelBtnTempAccess')}}</button>
          </div>
          <div class="detail-tabs">
            <button
              v-for="t in detailTabs" :key="t.id"
              class="detail-tab" :class="{active:detailTab===t.id}"
              @click="detailTab=t.id"
            >{{t.label}}</button>
          </div>
          <div class="detail-body">
            <!-- ROLES TAB -->
            <div v-if="detailTab==='roles'">
              <div class="section-label">{{L('labelAssignedRoles')}}</div>
              <div class="roles-wrap">
                <span v-for="r in uniqueRoles(selectedUser)" :key="r" class="role-badge" :style="roleBadgeStyle(r)">
                  {{r}}
                  <button class="role-remove" @click="confirmAction('removeRole',{uid:selectedUser.id,role:r})">✕</button>
                </span>
                <span v-if="!uniqueRoles(selectedUser).length" class="text-muted text-sm">{{L('labelNoRoles')}}</span>
              </div>
              <div class="section-label margin-t-lg">
                {{L('labelPermissions')}}
                <span v-if="selectedUser.is_auto_generated" class="auto-badge">{{L('labelAutoFromRoles')}}</span>
                <button v-if="cap.can_create_roles" class="btn-ghost text-sm" style="margin-left:auto" @click="openEditPermissions">✎ {{L('labelBtnEditPerms')}}</button>
              </div>
              <div class="permissions-list">
                <div v-for="(acts,tbl) in (selectedUser.permissions||{})" :key="tbl" class="permission-row">
                  <span class="mono">{{tbl}}</span>
                  <div class="actions-group">
                    <span v-for="a in (Array.isArray(acts)?acts:[acts])" :key="a" class="action-badge" :class="'action-'+a">{{a}}</span>
                  </div>
                </div>
                <div v-if="!Object.keys(selectedUser.permissions||{}).length" class="empty-state text-sm">
                  {{selectedUser.is_super_admin ? L('labelSuperAdminAccess') : L('labelNoPermissions')}}
                </div>
              </div>
            </div>
            <!-- VISIBILITY TAB -->
            <div v-if="detailTab==='visibility'">
              <div class="big-number">{{selectedUser.visible_clients_count}}</div>
              <div class="text-muted text-sm" style="text-align:center">{{L('labelVisibleClients')}}</div>
            </div>
            <!-- DEPARTMENTS TAB -->
            <div v-if="detailTab==='departments'">
              <div class="section-label">{{L('labelUserDepts')}}</div>
              <div class="odz-grid">
                <div v-for="o in allOdz" :key="o.id" class="odz-checkbox" :class="{checked:userHasDept(selectedUser, o.id)}">
                  <div class="checkbox" :class="{active:userHasDept(selectedUser, o.id)}"><span v-if="userHasDept(selectedUser, o.id)">✓</span></div>
                  {{o.name}}
                </div>
              </div>
              <div class="text-muted text-sm margin-t-md" style="text-align:center">
                {{countUserDepts(selectedUser)}} {{L('labelOf')}} {{allOdz.length}} {{L('labelDepartments').toLowerCase()}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== ADD ROLE MODAL ==================== -->
      <div v-if="showAddRoleModal&&selectedUser" class="overlay" @click.self="showAddRoleModal=false">
        <div class="modal">
          <div class="modal-title">{{L('labelAddRoleFor')}} {{selectedUser.full_name}}</div>
          <div class="roles-wrap">
            <span
              v-for="r in availableRoles" :key="r"
              class="role-badge clickable" :style="roleBadgeStyle(r)"
              @click="addRole(selectedUser.id,r)"
            >{{r}}</span>
            <span v-if="!availableRoles.length" class="text-muted text-sm">{{L('labelAllRolesAssigned')}}</span>
          </div>
        </div>
      </div>

      <!-- ==================== COPY MODAL ==================== -->
      <div v-if="showCopyModal&&selectedUser" class="overlay" @click.self="closeCopyModal">
        <div class="modal modal-wide">
          <!-- Step 1: Select target -->
          <template v-if="copyStep===1">
            <div class="modal-title">{{L('labelCopyFrom')}} {{selectedUser.full_name}}</div>
            <div class="text-muted text-sm margin-b-md">{{L('labelSelectTarget')}}</div>
            <input class="input-field" v-model="copySearch" :placeholder="L('labelSearch')"/>
            <div v-for="u in copyTargets" :key="u.id" class="copy-target" @click="selectCopyTarget(u)">
              <div class="copy-avatar">{{initials(u.full_name)}}</div>
              <div class="copy-info">
                <div style="font-weight:600">{{u.full_name}}</div>
                <div class="text-muted text-sm">{{u.email}}</div>
              </div>
            </div>
          </template>
          <!-- Step 2: Review & adjust -->
          <template v-if="copyStep===2">
            <div class="modal-title">{{L('labelReviewCopy')}}</div>
            <div class="text-muted text-sm margin-b-md">{{selectedUser.full_name}} → {{copyTarget.full_name}}</div>
            <div class="copy-action-row">
              <button class="btn-secondary text-sm" @click="copyStep=1">← {{L('labelChangeTarget')}}</button>
              <button class="btn-primary text-sm" :class="{modified:copyHasChanges}" @click="applyCopy">
                {{copyHasChanges?L('labelBtnApplyModified'):L('labelBtnApply')}}
              </button>
            </div>
            <div class="section-label">
              {{L('labelRoles')}}
              <span v-if="copyAdded.length||copyRemoved.length" class="change-hint">
                {{copyAdded.length?'+'+copyAdded.length:''}}{{copyRemoved.length?' -'+copyRemoved.length:''}} {{L('labelChanged')}}
              </span>
            </div>
            <div class="roles-wrap">
              <span
                v-for="r in allRoles" :key="r"
                class="role-badge clickable"
                :style="roleBadgeStyle(r)"
                :class="{dimmed:!copyRoles.includes(r)}"
                @click="toggleCopyRole(r)"
              >
                {{r}}
                <span v-if="copyRoles.includes(r)&&!sourceRoles.includes(r)" class="change-dot green">+</span>
                <span v-if="!copyRoles.includes(r)&&sourceRoles.includes(r)" class="change-dot red">−</span>
              </span>
            </div>
            <div class="section-label margin-t-md">
              {{L('labelDepartments')}}
              <span v-if="copyOdzChanged" class="change-hint">{{L('labelChanged')}}</span>
            </div>
            <div class="odz-actions">
              <button class="btn-ghost" @click="copyOdz=allOdz.map(o=>o.id)">{{L('labelSelectAll')}}</button>
              <button class="btn-ghost" @click="copyOdz=[]">{{L('labelClearAll')}}</button>
            </div>
            <div class="odz-grid">
              <div v-for="o in allOdz" :key="o.id" class="odz-checkbox" :class="{checked:copyOdz.includes(o.id)}" @click="toggleCopyOdz(o.id)">
                <div class="checkbox" :class="{active:copyOdz.includes(o.id)}"><span v-if="copyOdz.includes(o.id)">✓</span></div>
                {{o.name}}
              </div>
            </div>
            <div class="copy-summary">
              <div class="section-label text-sm">{{L('labelSummary')}}</div>
              <div class="text-muted text-sm">{{L('labelTarget')}}: <strong>{{copyTarget.full_name}}</strong></div>
              <div class="text-muted text-sm">{{L('labelRoles')}} ({{copyRoles.length}}): {{copyRoles.join(', ')||L('labelNone')}}</div>
              <div v-if="copyAdded.length" class="text-sm text-green">+ {{copyAdded.join(', ')}}</div>
              <div v-if="copyRemoved.length" class="text-sm text-red">− {{copyRemoved.join(', ')}}</div>
              <div class="text-muted text-sm">{{L('labelDepartments')}}: {{copyOdz.length}} {{L('labelOf')}} {{allOdz.length}}</div>
            </div>
          </template>
        </div>
      </div>

      <!-- ==================== TEMP GRANT MODAL ==================== -->
      <div v-if="showTempGrantModal&&selectedUser" class="overlay" @click.self="showTempGrantModal=false">
        <div class="modal modal-wide">
          <div class="modal-title">{{L('labelTempAccessFor')}} {{selectedUser.full_name}}</div>
          <div class="section-label">{{L('labelTempType')}}</div>
          <div class="toggle-group">
            <button class="toggle-btn" :class="{active:tempGrantType==='role'}" @click="tempGrantType='role';tempGrantRole='';tempGrantOdz=[]">{{L('labelTempRole')}}</button>
            <button class="toggle-btn" :class="{active:tempGrantType==='oddzial'}" @click="tempGrantType='oddzial';tempGrantRole='';tempGrantOdz=[]">{{L('labelTempDept')}}</button>
          </div>
          <template v-if="tempGrantType==='role'">
            <div class="section-label">{{L('labelSelectRole')}}</div>
            <div class="roles-wrap">
              <span
                v-for="r in tempAvailableRoles" :key="r"
                class="role-badge clickable" :style="roleBadgeStyle(r)"
                :class="{'role-selected':tempGrantRole===r}"
                @click="tempGrantRole=r"
              >{{r}}</span>
              <span v-if="!tempAvailableRoles.length" class="text-muted text-sm">{{L('labelAllRolesAssigned')}}</span>
            </div>
          </template>
          <template v-if="tempGrantType==='oddzial'">
            <div class="section-label">{{L('labelSelectDepts')}}</div>
            <div class="odz-grid">
              <div v-for="o in allOdz" :key="o.id" class="odz-checkbox" :class="{checked:tempGrantOdz.includes(o.id)}" @click="toggleTempOdz(o.id)">
                <div class="checkbox" :class="{active:tempGrantOdz.includes(o.id)}"><span v-if="tempGrantOdz.includes(o.id)">✓</span></div>
                {{o.name}}
              </div>
            </div>
          </template>
          <div class="section-label margin-t-md">{{L('labelTempExpires')}}</div>
          <input type="datetime-local" class="input-field" v-model="tempGrantExp"/>
          <div class="section-label margin-t-md">{{L('labelTempReason')}}</div>
          <input class="input-field" v-model="tempGrantReason" :placeholder="L('labelTempReasonPlaceholder')"/>
          <button class="btn-primary margin-t-md full-width" @click="applyTempGrant" :disabled="!canApplyTempGrant">{{L('labelTempApply')}}</button>
        </div>
      </div>

      <!-- ==================== EXTEND GRANT MODAL ==================== -->
      <div v-if="showExtendModal" class="overlay" @click.self="showExtendModal=false">
        <div class="modal">
          <div class="modal-title">{{L('labelExtendAccess')}}</div>
          <div class="section-label margin-t-sm">{{L('labelNewExpiry')}}</div>
          <input type="datetime-local" class="input-field" v-model="extendDate"/>
          <button class="btn-primary margin-t-md full-width" @click="doExtend" :disabled="!extendDate">{{L('labelSave')}}</button>
        </div>
      </div>

      <!-- ==================== CREATE ROLE MODAL ==================== -->
      <div v-if="showCreateRole" class="overlay" @click.self="showCreateRole=false">
        <div class="modal modal-wide">
          <div class="modal-title">{{L('labelNewRole')}}</div>
          <input class="input-field margin-b-sm" v-model="newRoleName" :placeholder="L('labelRoleNamePlaceholder')"/>
          <div class="section-label margin-t-sm">{{L('labelRoleColor')}}</div>
          <div class="color-row">
            <label class="color-label">BG: <input type="color" v-model="newRoleColorBg" class="color-input"/></label>
            <label class="color-label">Text: <input type="color" v-model="newRoleColorFg" class="color-input"/></label>
            <span class="role-badge" :style="{backgroundColor:newRoleColorBg,color:newRoleColorFg}">{{newRoleName||'PREVIEW'}}</span>
          </div>
          <div class="section-label margin-t-md">{{L('labelTemplates')}}</div>
          <div v-for="(tpl,idx) in newRoleTemplates" :key="idx" class="edit-template-row">
            <select class="select-field" v-model="tpl.table_name" style="flex:1">
              <option value="">— {{L('labelSelectTable')}} —</option>
              <option v-for="t in availableTables" :key="t" :value="t">{{t}}</option>
            </select>
            <div class="actions-group">
              <label v-for="act in ['select','insert','update','delete']" :key="act" class="action-toggle" :class="{active:tpl.actions.includes(act)}" @click.prevent="toggleAction(tpl, act)">{{act}}</label>
              <label class="action-toggle" :class="{active:hasAllActions(tpl)}" @click.prevent="toggleAllActions(tpl)">ALL</label>
            </div>
            <button class="btn-icon-danger" @click="newRoleTemplates.splice(idx,1)">✕</button>
          </div>
          <button class="btn-ghost margin-t-sm" @click="newRoleTemplates.push({table_name:'',actions:[]})">+ {{L('labelAddTemplate')}}</button>
          <button class="btn-primary margin-t-md full-width" @click="createRole" :disabled="!newRoleName.trim()">{{L('labelCreate')}}</button>
        </div>
      </div>

      <!-- ==================== EDIT ROLE MODAL ==================== -->
      <div v-if="showEditRole" class="overlay" @click.self="showEditRole=false">
        <div class="modal modal-wide">
          <div class="modal-title">{{L('labelEditRole')}}: {{editRoleName}}</div>
          <div class="section-label margin-t-sm">{{L('labelRoleColor')}}</div>
          <div class="color-row">
            <label class="color-label">BG: <input type="color" v-model="editRoleColorBg" class="color-input"/></label>
            <label class="color-label">Text: <input type="color" v-model="editRoleColorFg" class="color-input"/></label>
            <span class="role-badge" :style="{backgroundColor:editRoleColorBg,color:editRoleColorFg}">{{editRoleName}}</span>
          </div>
          <div class="section-label margin-t-md">{{L('labelTemplates')}}</div>
          <div v-for="(tpl,idx) in editRoleTemplates" :key="idx" class="edit-template-row">
            <select class="select-field" v-model="tpl.table_name" style="flex:1">
              <option value="">— {{L('labelSelectTable')}} —</option>
              <option v-for="t in availableTables" :key="t" :value="t">{{t}}</option>
            </select>
            <div class="actions-group">
              <label v-for="act in ['select','insert','update','delete']" :key="act" class="action-toggle" :class="{active:tpl.actions.includes(act)}" @click.prevent="toggleAction(tpl, act)">{{act}}</label>
              <label class="action-toggle" :class="{active:hasAllActions(tpl)}" @click.prevent="toggleAllActions(tpl)">ALL</label>
            </div>
            <button class="btn-icon-danger" @click="editRoleTemplates.splice(idx,1)">✕</button>
          </div>
          <button class="btn-ghost margin-t-sm" @click="editRoleTemplates.push({table_name:'',actions:[]})">+ {{L('labelAddTemplate')}}</button>
          <button class="btn-primary margin-t-md full-width" @click="saveRoleTemplates">{{L('labelSave')}}</button>
        </div>
      </div>

      <!-- ==================== EDIT USER PERMISSIONS MODAL ==================== -->
      <div v-if="showEditPerms" class="overlay" @click.self="showEditPerms=false">
        <div class="modal modal-wide">
          <div class="modal-title">{{L('labelEditPermsFor')}} {{selectedUser?.full_name}}</div>
          <div class="text-muted text-sm margin-b-md">{{L('labelEditPermsHint')}}</div>
          <div v-for="(perm,idx) in editPermsData" :key="idx" class="edit-template-row">
            <select class="select-field" v-model="perm.table_name" style="flex:1">
              <option value="">— {{L('labelSelectTable')}} —</option>
              <option v-for="t in availableTables" :key="t" :value="t">{{t}}</option>
            </select>
            <div class="actions-group">
              <label v-for="act in ['select','insert','update','delete']" :key="act" class="action-toggle" :class="{active:perm.actions.includes(act)}" @click.prevent="toggleAction(perm, act)">{{act}}</label>
              <label class="action-toggle" :class="{active:hasAllActions(perm)}" @click.prevent="toggleAllActions(perm)">ALL</label>
            </div>
            <button class="btn-icon-danger" @click="editPermsData.splice(idx,1)">✕</button>
          </div>
          <button class="btn-ghost margin-t-sm" @click="editPermsData.push({table_name:'',actions:[]})">+ {{L('labelAddPermission')}}</button>
          <button class="btn-primary margin-t-md full-width" @click="saveUserPermissions">{{L('labelSave')}}</button>
        </div>
      </div>

      <!-- ==================== CONFIRM MODAL ==================== -->
      <div v-if="confirmModal" class="overlay" @click.self="confirmModal=null">
        <div class="modal">
          <div class="modal-title">{{confirmModal.title}}</div>
          <div class="text-muted text-sm margin-b-md">{{confirmModal.message}}</div>
          <div class="copy-action-row">
            <button class="btn-secondary" @click="confirmModal=null">{{L('labelCancel')}}</button>
            <button class="btn-primary btn-danger-fill" @click="executeConfirmed">{{L('labelConfirm')}}</button>
          </div>
        </div>
      </div>

      <!-- TOAST -->
      <div v-if="toast" class="toast" :class="toast.type">{{toast.message}}</div>
    </template>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

const ROLE_COLORS = {
  admin: { bg: '#1a1a2e', fg: '#e0e0ff' },
  dyrektor: { bg: '#2d1b4e', fg: '#d4b8ff' },
  wicedyrektor: { bg: '#3a1f5e', fg: '#d4b8ff' },
  teamlead: { bg: '#1b3a4e', fg: '#b8e0ff' },
  koordynator: { bg: '#1b4e3a', fg: '#b8ffd4' },
  hr: { bg: '#4e1b3a', fg: '#ffb8d4' },
  legalizacja: { bg: '#4e3a1b', fg: '#ffd4b8' },
  archiwizacja: { bg: '#3a4e1b', fg: '#d4ffb8' },
  korespondencja: { bg: '#1b4e4e', fg: '#b8ffff' },
  kontroling: { bg: '#4e4e1b', fg: '#ffffb8' },
  onboarding: { bg: '#1b2e4e', fg: '#b8d4ff' },
};

const AVAILABLE_TABLES = [
  'archiwum', 'oplaty', 'managers', 'users_roles', 'user_permissions',
  'vacations', 'korespondencja', 'role_permissions', 'temporary_grants',
  'oddzialy', 'change_logs', 'global_settings', 'clients',
];

const PER_PAGE = 50;

export default {
  props: { content: { type: Object, required: true } },
  data() {
    return {
      supabase: null,
      loading: true,
      activePage: 'dashboard',
      detailTab: 'roles',
      searchQuery: '',
      filterRole: '',
      currentPage: 1,

      stats: {},
      users: [],
      rolesWithTemplates: [],
      allRoles: [],
      allOdz: [],
      auditLogs: [],
      tempGrants: [],
      cap: {},

      selectedUser: null,
      showAddRoleModal: false,
      showCopyModal: false,
      showTempGrantModal: false,
      showCreateRole: false,
      showExtendModal: false,
      showEditRole: false,
      showEditPerms: false,
      toast: null,
      confirmModal: null,

      // Audit
      auditFilter: '',
      auditUser: '',
      auditTables: [],

      // Copy
      copyStep: 1,
      copySearch: '',
      copyTarget: null,
      copyRoles: [],
      copyOdz: [],

      // Temp grant
      tempGrantType: 'role',
      tempGrantRole: '',
      tempGrantOdz: [],
      tempGrantExp: '',
      tempGrantReason: '',

      // Create role
      newRoleName: '',
      newRoleColorBg: '#2d3a1b',
      newRoleColorFg: '#d4ffb8',
      newRoleTemplates: [],

      // Extend
      extendDate: '',
      extendGrant_: null,

      // Edit role
      editRoleName: '',
      editRoleTemplates: [],
      editRoleColorBg: '#333',
      editRoleColorFg: '#ccc',

      // Role colors from DB
      roleColorsMap: {},

      // Edit user permissions
      editPermsData: [],

      // Timers
      _auditTimer: null,
      _debounceTimer: null,
    };
  },

  computed: {
    cssVars() {
      const c = this.content;
      return {
        '--accent': c.accentColor || '#6366f1',
        '--accent-hover': c.accentHoverColor || 'rgba(99,102,241,0.12)',
        '--bg': c.bgColor || '#0f0f0f',
        '--card-bg': c.cardBgColor || '#1c1c1c',
        '--card-radius': c.cardBorderRadius || '12px',
        '--border': c.borderColor || '#2a2a28',
        '--border-light': c.borderLightColor || 'rgba(255,255,255,0.02)',
        '--text': c.textColor || '#e8e6e1',
        '--text-muted': c.textMutedColor || '#8a8880',
        '--title-size': c.titleFontSize || '24px',
        '--title-weight': c.titleFontWeight || '700',
        '--body-size': c.bodyFontSize || '13px',
        '--small-size': c.smallFontSize || '11px',
        '--font': c.fontFamily || "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        '--badge-size': c.badgeFontSize || '11px',
        '--badge-pad': c.badgePadding || '3px 10px',
        '--badge-radius': c.badgeBorderRadius || '20px',
        '--input-bg': c.inputBgColor || '#1c1c1c',
        '--input-border': c.inputBorderColor || '#2a2a28',
        '--input-focus': c.inputFocusBorderColor || '#6366f1',
        '--input-radius': c.inputBorderRadius || '8px',
        '--input-pad': c.inputPadding || '10px 14px',
        '--input-size': c.inputFontSize || '13px',
        '--select-bg': c.selectBgColor || '#1c1c1c',
        '--select-text': c.selectTextColor || '#e8e6e1',
        '--select-border': c.selectBorderColor || '#2a2a28',
        '--select-size': c.selectFontSize || '13px',
        '--select-opt-bg': c.selectOptionBg || '#1c1c1c',
        '--select-opt-text': c.selectOptionText || '#e8e6e1',
        '--btn-bg': c.btnPrimaryBg || '#6366f1',
        '--btn-text': c.btnPrimaryText || '#fff',
        '--btn2-bg': c.btnSecondaryBg || '#1c1c1c',
        '--btn2-text': c.btnSecondaryText || '#e8e6e1',
        '--btn-radius': c.btnBorderRadius || '8px',
        '--btn-pad': c.btnPadding || '8px 14px',
        '--btn-size': c.btnFontSize || '12px',
        '--row-hover': c.tableRowHoverBg || 'rgba(99,102,241,0.06)',
        '--row-selected': c.tableRowSelectedBg || 'rgba(99,102,241,0.12)',
        '--row-border': c.tableRowBorderColor || 'rgba(255,255,255,0.02)',
        '--status-active': c.statusActiveColor || '#22c55e',
        '--status-inactive': c.statusInactiveColor || '#eab308',
        '--status-terminated': c.statusTerminatedColor || '#ef4444',
        '--status-vacation': c.statusVacationColor || '#6366f1',
        '--overlay-bg': c.overlayBgColor || 'rgba(0,0,0,0.6)',
        '--panel-width': c.panelWidth || '540px',
        '--panel-bg': c.panelBgColor || '#1c1c1c',
        '--modal-bg': c.modalBgColor || '#1c1c1c',
        '--modal-radius': c.modalBorderRadius || '16px',
        '--modal-width': c.modalMaxWidth || '560px',
        '--modal-pad': c.modalPadding || '24px',
        '--toast-ok-bg': c.toastSuccessBg || '#065f46',
        '--toast-ok-text': c.toastSuccessText || '#a7f3d0',
        '--toast-err-bg': c.toastErrorBg || '#7f1d1d',
        '--toast-err-text': c.toastErrorText || '#fca5a5',
        '--toast-info-bg': c.toastInfoBg || '#1e3a5f',
        '--toast-info-text': c.toastInfoText || '#93c5fd',
        '--anim-dur': c.animationDuration || '200ms',
        '--anim-ease': c.animationEasing || 'ease-out',
        '--sp-xs': c.spacingXs || '4px',
        '--sp-sm': c.spacingSm || '8px',
        '--sp-md': c.spacingMd || '16px',
        '--sp-lg': c.spacingLg || '24px',
        '--sp-xl': c.spacingXl || '32px',
        '--sidebar-w': c.sidebarWidth || '220px',
        '--sidebar-bg': c.sidebarBgColor || '#161616',
        '--sidebar-border': c.sidebarBorderColor || '#2a2a28',
        '--content-pad': c.contentPadding || '32px',
        '--content-max-w': c.contentMaxWidth || '1100px',
        '--nav-active-color': c.navActiveColor || '#6366f1',
        '--nav-active-bg': c.navActiveBg || 'rgba(99,102,241,0.12)',
        '--nav-inactive': c.navInactiveColor || '#8a8880',
        '--nav-hover-bg': c.navHoverBg || 'rgba(99,102,241,0.06)',
        '--stat-managers-color': c.statManagersColor || '#22c55e',
        '--stat-clients-color': c.statClientsColor || '#6366f1',
        '--stat-vacation-color': c.statVacationColor || '#eab308',
        '--stat-pending-color': c.statPendingColor || '#ef4444',
        '--stat-changes-color': c.statChangesColor || '#8b5cf6',
        '--stat-temp-color': c.statTempColor || '#f59e0b',
        '--stat-roles-color': c.statRolesColor || '#6366f1',
        '--stat-depts-color': c.statDeptsColor || '#0ea5e9',
        '--detail-tab-active-color': c.detailTabActiveColor || c.navActiveColor || '#6366f1',
        '--detail-tab-active-border': c.detailTabActiveBorder || c.navActiveColor || '#6366f1',
        '--action-active-bg': c.actionActiveBg || '#6366f1',
        '--action-active-text': c.actionActiveText || '#ffffff',
        '--action-active-border': c.actionActiveBorder || '#6366f1',
        '--status-active-text': c.statusActiveTextColor || '#22c55e',
        '--status-inactive-text': c.statusInactiveTextColor || '#eab308',
        '--status-terminated-text': c.statusTerminatedTextColor || '#ef4444',
        '--status-vacation-text': c.statusVacationTextColor || '#6366f1',
      };
    },

    navItems() {
      const c = this.content;
      const items = [
        { id: 'dashboard', label: c.labelDashboard || 'Dashboard', icon: '◈' },
        { id: 'users', label: c.labelUsers || 'Użytkownicy', icon: '◎' },
        { id: 'roles', label: c.labelRoles || 'Role', icon: '◇' },
        { id: 'audit', label: c.labelAudit || 'Audyt', icon: '◫' },
        { id: 'temp', label: c.labelTemp || 'Tymczasowe', icon: '⏱' },
      ];
      return items.filter(i => this.cap.can_view_audit !== false || i.id !== 'audit');
    },

    detailTabs() {
      return [
        { id: 'roles', label: this.content.labelTabRoles || 'Role i uprawnienia' },
        { id: 'visibility', label: this.content.labelTabVisibility || 'Widoczność klientów' },
        { id: 'departments', label: this.content.labelTabDepts || 'Oddziały' },
      ];
    },

    dashCards() {
      const s = this.stats;
      const c = this.content;
      const all = [
        { id: 'managers', v: s.total_managers || 0, l: this.L('labelStatManagers'), c: 'var(--stat-managers-color)', show: c.showStatManagers !== false, order: c.orderStatManagers ?? 1 },
        { id: 'clients', v: s.active_clients || 0, l: this.L('labelStatClients'), c: 'var(--stat-clients-color)', show: c.showStatClients !== false, order: c.orderStatClients ?? 2 },
        { id: 'vacation', v: s.on_vacation_now || 0, l: this.L('labelStatVacation'), c: 'var(--stat-vacation-color)', show: c.showStatVacation !== false, order: c.orderStatVacation ?? 3 },
        { id: 'pending', v: s.pending_vacations || 0, l: this.L('labelStatPending'), c: 'var(--stat-pending-color)', show: c.showStatPending !== false, order: c.orderStatPending ?? 4 },
        { id: 'changes', v: s.recent_changes_24h || 0, l: this.L('labelStatChanges'), c: 'var(--stat-changes-color)', show: c.showStatChanges !== false, order: c.orderStatChanges ?? 5 },
        { id: 'temp', v: s.active_temp_grants || 0, l: this.L('labelStatTempGrants'), c: 'var(--stat-temp-color)', show: c.showStatTempGrants === true, order: c.orderStatTempGrants ?? 6 },
        { id: 'roles_count', v: s.total_roles || this.allRoles.length || 0, l: this.L('labelStatRolesCount'), c: 'var(--stat-roles-color)', show: c.showStatRolesCount === true, order: c.orderStatRolesCount ?? 7 },
        { id: 'depts', v: s.total_departments || this.allOdz.length || 0, l: this.L('labelStatDepts'), c: 'var(--stat-depts-color)', show: c.showStatDepts === true, order: c.orderStatDepts ?? 8 },
      ];
      return all.filter(x => x.show).sort((a, b) => a.order - b.order);
    },

    filteredUsers() {
      return this.users.filter(u => {
        const matchSearch = !this.searchQuery ||
          u.full_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchRole = !this.filterRole || (u.roles || []).includes(this.filterRole);
        return matchSearch && matchRole;
      });
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.filteredUsers.length / PER_PAGE));
    },

    paginatedUsers() {
      const start = (this.currentPage - 1) * PER_PAGE;
      return this.filteredUsers.slice(start, start + PER_PAGE);
    },

    availableRoles() {
      if (!this.selectedUser) return [];
      const existing = this.uniqueRoles(this.selectedUser);
      return this.allRoles.filter(r => !existing.includes(r));
    },

    tempAvailableRoles() {
      if (!this.selectedUser) return [];
      const existing = this.uniqueRoles(this.selectedUser);
      const activeTempRoles = this.tempGrants
        .filter(g => g.grant_type === 'role' && g.user_id === this.selectedUser.id)
        .map(g => g.role_name);
      return this.allRoles.filter(r => !existing.includes(r) && !activeTempRoles.includes(r));
    },

    copyTargets() {
      if (!this.selectedUser) return [];
      return this.users.filter(u =>
        u.id !== this.selectedUser.id &&
        (!this.copySearch ||
          u.full_name.toLowerCase().includes(this.copySearch.toLowerCase()) ||
          u.email.toLowerCase().includes(this.copySearch.toLowerCase()))
      );
    },

    sourceRoles() {
      return this.selectedUser ? (this.selectedUser.roles || []) : [];
    },

    copyAdded() {
      return this.copyRoles.filter(r => !this.sourceRoles.includes(r));
    },

    copyRemoved() {
      return this.sourceRoles.filter(r => !this.copyRoles.includes(r));
    },

    copyOdzChanged() {
      return [...(this.selectedUser?.allowed_oddzial_ids || [])].sort().join(',') !== [...this.copyOdz].sort().join(',');
    },

    copyHasChanges() {
      return this.copyAdded.length > 0 || this.copyRemoved.length > 0 || this.copyOdzChanged;
    },

    canApplyTempGrant() {
      return !!this.tempGrantExp && (this.tempGrantType === 'role' ? !!this.tempGrantRole : this.tempGrantOdz.length > 0);
    },

    availableTables() {
      return AVAILABLE_TABLES;
    },
  },

  watch: {
    'content.supabaseUrl'() { this.initSupabase(); },
    'content.supabaseAnonKey'() { this.initSupabase(); },
    activePage(p) {
      if (p === 'audit') this.loadAudit();
      if (p === 'temp') this.loadTempGrants();
      if (p === 'roles') this.loadRoles();
    },
    searchQuery() { this.currentPage = 1; },
    filterRole() { this.currentPage = 1; },
  },

  mounted() {
    this.initSupabase();
    setTimeout(() => { if (!this.supabase) this.initSupabase(); }, 1000);
    setTimeout(() => { if (!this.supabase) this.initSupabase(); }, 3000);
  },

  unmounted() {
    this.clearAuditTimer();
    if (this._debounceTimer) clearTimeout(this._debounceTimer);
  },

  methods: {
    L(k) {
      if (this.content[k]) return this.content[k];
      // Fallback defaults for all label properties
      const defaults = {
        labelDashboard:'Dashboard', labelUsers:'Użytkownicy', labelRoles:'Role', labelAudit:'Audyt', labelTemp:'Tymczasowe',
        labelStatManagers:'Aktywni menedżerowie', labelStatClients:'Aktywni klienci', labelStatVacation:'Na urlopie',
        labelStatPending:'Oczekujące urlopy', labelStatChanges:'Zmiany 24h', labelStatTempGrants:'Aktywne tymcz. dostępy',
        labelStatRolesCount:'Zdefiniowane role', labelStatDepts:'Oddziały',
        labelRolesDistribution:'Rozkład ról', labelDepartments:'Oddziały',
        labelColUser:'UŻYTKOWNIK', labelColRoles:'ROLE', labelColDept:'ODDZIAŁ', labelColClients:'KLIENTÓW', labelColStatus:'STATUS',
        labelStatusActive:'Aktywny', labelStatusInactive:'Nieaktywny', labelStatusTerminated:'Zwolniony', labelStatusVacation:'Urlop',
        labelBtnCopy:'Kopiuj uprawnienia na...', labelBtnAddRole:'+ Dodaj rolę', labelBtnTempAccess:'⏱ Tymczasowy dostęp',
        labelBtnNewRole:'+ Nowa rola', labelBtnEditRole:'Edytuj', labelBtnEditPerms:'Edytuj',
        labelBtnApply:'Zastosuj kopię', labelBtnApplyModified:'Zastosuj ze zmianami',
        labelBtnExtend:'Przedłuż', labelBtnRevoke:'Cofnij',
        labelGrantedBy:'Nadane przez', labelExpiresAt:'Wygasa',
        labelSearch:'Szukaj po nazwisku lub email...', labelAllRoles:'Wszystkie role', labelNoResults:'Brak wyników',
        labelSuperAdmin:'SuperAdmin', labelVacation:'URLOP', labelPrev:'Wstecz', labelNext:'Dalej',
        labelTabRoles:'Role i uprawnienia', labelTabVisibility:'Widoczność klientów', labelTabDepts:'Oddziały',
        labelAssignedRoles:'Wydane role', labelPermissions:'Uprawnienia', labelVisibleClients:'widocznych klientów',
        labelAutoFromRoles:'auto z ról', labelNoRoles:'Brak ról',
        labelSuperAdminAccess:'Super admin — pełny dostęp', labelNoPermissions:'Brak uprawnień',
        labelAllRolesAssigned:'Wszystkie role przypisane',
        labelAddRoleFor:'Dodaj rolę —', labelDept:'Oddział', labelUserDepts:'Dostępne oddziały',
        labelCopyFrom:'Kopiuj z', labelSelectTarget:'Wybierz cel', labelReviewCopy:'Sprawdź i dostosuj',
        labelChangeTarget:'Zmień cel', labelChanged:'zmienione', labelSummary:'Podsumowanie',
        labelTarget:'Cel', labelNone:'brak', labelOf:'z', labelSelectAll:'Zaznacz wszystkie', labelClearAll:'Wyczyść',
        labelRoles:'Role',
        labelTempAccessFor:'Tymczasowy dostęp —', labelTempType:'Typ', labelTempRole:'Rola', labelTempDept:'Oddział',
        labelTempExpires:'Wygasa (czas polski)', labelTempReason:'Powód (opcjonalnie)',
        labelTempReasonPlaceholder:'np. zastępstwo za...', labelTempApply:'Nadaj tymczasowy dostęp',
        labelSelectRole:'Wybierz rolę', labelSelectDepts:'Wybierz oddziały',
        labelExtendAccess:'Przedłuż dostęp', labelNewExpiry:'Nowa data wygaśnięcia',
        labelSave:'Zapisz', labelCreate:'Utwórz', labelCancel:'Anuluj', labelConfirm:'Potwierdź',
        labelNewRole:'Nowa rola', labelRoleNamePlaceholder:'Nazwa roli...',
        labelEditRole:'Edycja roli', labelTemplates:'Szablony uprawnień',
        labelSelectTable:'Wybierz tabelę', labelAddTemplate:'Dodaj szablon', labelNoTemplates:'Brak szablonów',
        labelRolesHint:'Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.',
        labelUsersCount:'użytk.', labelRoleColor:'Kolor roli',
        labelEditPermsFor:'Edycja uprawnień —', labelEditPermsHint:'Ręczna zmiana uprawnień nadpisuje automatyczne uprawnienia z ról.',
        labelAddPermission:'Dodaj uprawnienie',
        labelAuditAllTables:'Wszystkie', labelAuditEmailPlaceholder:'Wyszukaj Email...', labelNoAuditEntries:'Brak wpisów',
        labelNoTempGrants:'Brak aktywnych tymczasowych uprawnień',
        labelConfirmDeleteRole:'Usunąć rolę "{role}"? To usunie ją od wszystkich użytkowników.',
        labelConfirmDeleteRoleTitle:'Usunięcie roli',
        labelConfirmRemoveRole:'Usunąć rolę "{role}" użytkownikowi {user}?',
        labelConfirmRemoveRoleTitle:'Usunięcie roli użytkownikowi',
        labelConfirmRevoke:'Cofnąć tymczasowy dostęp?', labelConfirmRevokeTitle:'Cofnięcie tymczasowego dostępu',
      };
      return defaults[k] || '';
    },

    // ========== SUPABASE INIT ==========
    async initSupabase() {
      try {
        if (typeof wwLib !== 'undefined') {
          const i = wwLib?.wwPlugins?.supabase?.instance || wwLib?.wwPlugins?.supabaseAuth?.publicInstance;
          if (i) { this.supabase = i; await this.loadAll(); return; }
        }
        const u = this.content.supabaseUrl, k = this.content.supabaseAnonKey;
        if (u && k) { this.supabase = createClient(u, k); await this.loadAll(); return; }
        this.supabase = null;
      } catch (e) {
        console.error('initSupabase error:', e);
        this.showToast('Błąd połączenia z Supabase', 'error');
      }
    },

    // ========== DATA LOADING ==========
    async loadAll() {
      this.loading = true;
      try {
        const [sRes, uRes, cRes, rRes, oRes] = await Promise.all([
          this.supabase.rpc('admin_dashboard_stats'),
          this.supabase.rpc('get_admin_users_overview'),
          this.supabase.rpc('admin_get_my_capabilities'),
          this.supabase.rpc('admin_get_roles_with_templates'),
          this.supabase.from('oddzialy').select('id,oddzial').order('oddzial'),
        ]);

        if (sRes.error) throw sRes.error;
        if (uRes.error) throw uRes.error;
        if (cRes.error) throw cRes.error;
        if (rRes.error) throw rRes.error;
        if (oRes.error) throw oRes.error;

        this.stats = sRes.data || {};
        // get_admin_users_overview returns a jsonb array directly
        const rawUsers = Array.isArray(uRes.data) ? uRes.data : (uRes.data || []);
        this.users = this.deduplicateUsers(rawUsers);
        this.cap = cRes.data || {};
        this.rolesWithTemplates = rRes.data || [];
        this.allRoles = this.rolesWithTemplates.map(x => x.name);
        // Build role colors map from DB
        const rcm = {};
        for (const r of this.rolesWithTemplates) {
          if (r.color_bg && r.color_fg) {
            rcm[r.name] = { bg: r.color_bg, fg: r.color_fg };
          }
        }
        this.roleColorsMap = rcm;
        this.allOdz = (oRes.data || []).map(x => ({ id: x.id, name: x.oddzial }));

        // Build audit tables from roles templates + known tables
        const tblSet = new Set(AVAILABLE_TABLES);
        this.rolesWithTemplates.forEach(r => (r.templates || []).forEach(t => tblSet.add(t.table_name)));
        this.auditTables = [...tblSet].sort();
      } catch (e) {
        console.error('loadAll error:', e);
        this.showToast(e.message || 'Błąd ładowania danych', 'error');
      }
      this.loading = false;
    },

    deduplicateUsers(users) {
      const map = new Map();
      for (const u of users) {
        if (map.has(u.id)) {
          const existing = map.get(u.id);
          const mergedRoles = [...new Set([...(existing.roles || []), ...(u.roles || [])])];
          existing.roles = mergedRoles;
        } else {
          map.set(u.id, { ...u, roles: [...new Set(u.roles || [])] });
        }
      }
      return [...map.values()];
    },

    uniqueRoles(user) {
      return [...new Set(user?.roles || [])];
    },

    async loadAudit() {
      try {
        const { data, error } = await this.supabase.rpc('admin_get_audit_trail', {
          p_table_name: this.auditFilter || null,
          p_user_email: this.auditUser || null,
          p_limit: 200,
        });
        if (error) throw error;
        this.auditLogs = data?.records || [];
      } catch (e) {
        console.error('loadAudit error:', e);
        this.showToast(e.message || 'Błąd ładowania audytu', 'error');
      }
      this.setupAuditRefresh();
    },

    clearAuditTimer() {
      if (this._auditTimer) {
        clearInterval(this._auditTimer);
        this._auditTimer = null;
      }
    },

    setupAuditRefresh() {
      this.clearAuditTimer();
      if (this.content.auditAutoRefresh !== false) {
        this._auditTimer = setInterval(() => {
          if (this.activePage === 'audit') this.loadAudit();
        }, (this.content.auditRefreshInterval || 3) * 1000);
      }
    },

    debounceAudit() {
      if (this._debounceTimer) clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => this.loadAudit(), 400);
    },

    async loadTempGrants() {
      try {
        const { data, error } = await this.supabase.rpc('admin_get_temporary_grants');
        if (error) throw error;
        this.tempGrants = data || [];
      } catch (e) {
        console.error('loadTempGrants error:', e);
        this.showToast(e.message || 'Błąd ładowania tymczasowych dostępów', 'error');
      }
    },

    async loadRoles() {
      try {
        const { data, error } = await this.supabase.rpc('admin_get_roles_with_templates');
        if (error) throw error;
        this.rolesWithTemplates = data || [];
        this.allRoles = this.rolesWithTemplates.map(x => x.name);
        const rcm = {};
        for (const r of this.rolesWithTemplates) {
          if (r.color_bg && r.color_fg) rcm[r.name] = { bg: r.color_bg, fg: r.color_fg };
        }
        this.roleColorsMap = rcm;
      } catch (e) {
        console.error('loadRoles error:', e);
        this.showToast(e.message || 'Błąd ładowania ról', 'error');
      }
    },

    // ========== USER DETAIL ==========
    openDetail(u) {
      this.selectedUser = u;
      this.detailTab = 'roles';
    },

    async refreshSelectedUser(uid) {
      await this.loadAll();
      if (uid) {
        this.selectedUser = this.users.find(u => u.id === uid) || null;
      }
    },

    // ========== ROLE MANAGEMENT ==========
    async addRole(uid, roleName) {
      try {
        const { error } = await this.supabase.rpc('admin_assign_role', { p_user_id: uid, p_role_name: roleName });
        if (error) throw error;
        this.showToast(`Rola ${roleName} przypisana`, 'success');
        this.showAddRoleModal = false;
        await this.refreshSelectedUser(uid);
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    async removeRoleConfirmed(uid, roleName) {
      try {
        const { error } = await this.supabase.rpc('admin_remove_role', { p_user_id: uid, p_role_name: roleName });
        if (error) throw error;
        this.showToast(`Rola ${roleName} usunięta`, 'success');
        await this.refreshSelectedUser(uid);
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    async createRole() {
      try {
        const templates = this.newRoleTemplates
          .filter(t => t.table_name && t.actions.length)
          .map(t => ({ table_name: t.table_name, actions: t.actions }));
        const { error } = await this.supabase.rpc('admin_create_role', {
          p_role_name: this.newRoleName.trim(),
          p_templates: templates,
          p_color_bg: this.newRoleColorBg || null,
          p_color_fg: this.newRoleColorFg || null,
        });
        if (error) throw error;
        this.showToast('Rola utworzona', 'success');
        this.showCreateRole = false;
        this.newRoleName = '';
        this.newRoleTemplates = [];
        await this.loadRoles();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    async deleteRoleConfirmed(roleName) {
      try {
        const { error } = await this.supabase.rpc('admin_delete_role', { p_role_name: roleName });
        if (error) throw error;
        this.showToast('Rola usunięta', 'success');
        await this.loadRoles();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    // ========== EDIT ROLE TEMPLATES ==========
    openEditRole(rl) {
      this.editRoleName = rl.name;
      this.editRoleColorBg = rl.color_bg || this.roleColorsMap[rl.name]?.bg || ROLE_COLORS[rl.name]?.bg || '#333';
      this.editRoleColorFg = rl.color_fg || this.roleColorsMap[rl.name]?.fg || ROLE_COLORS[rl.name]?.fg || '#ccc';
      this.editRoleTemplates = (rl.templates || []).map(t => ({
        table_name: t.table_name,
        actions: [...(t.actions || [])].filter(a => a !== 'all'),
      }));
      this.showEditRole = true;
    },

    async saveRoleTemplates() {
      try {
        const templates = this.editRoleTemplates
          .filter(t => t.table_name && t.actions.length)
          .map(t => ({ table_name: t.table_name, actions: t.actions }));
        const { data, error } = await this.supabase.rpc('admin_update_role_templates', {
          p_role_name: this.editRoleName,
          p_templates: templates,
        });
        if (error) throw error;
        // Save color
        await this.supabase.rpc('admin_update_role_color', {
          p_role_name: this.editRoleName,
          p_color_bg: this.editRoleColorBg,
          p_color_fg: this.editRoleColorFg,
        });
        this.showToast('Rola zaktualizowana', 'success');
        this.showEditRole = false;
        await this.loadRoles();
        await this.loadAll();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    // ========== EDIT USER PERMISSIONS ==========
    openEditPermissions() {
      if (!this.selectedUser) return;
      const perms = this.selectedUser.permissions || {};
      this.editPermsData = Object.entries(perms).map(([tbl, acts]) => ({
        table_name: tbl,
        actions: Array.isArray(acts) ? [...acts] : [acts],
      }));
      if (this.editPermsData.length === 0) {
        this.editPermsData.push({ table_name: '', actions: [] });
      }
      this.showEditPerms = true;
    },

    async saveUserPermissions() {
      try {
        const permsObj = {};
        for (const p of this.editPermsData) {
          if (p.table_name && p.actions.length) {
            permsObj[p.table_name] = p.actions;
          }
        }
        const { data, error } = await this.supabase.rpc('admin_update_user_permissions', {
          p_user_id: this.selectedUser.id,
          p_permissions: permsObj,
        });
        if (error) throw error;
        this.showToast('Uprawnienia zaktualizowane', 'success');
        this.showEditPerms = false;
        await this.refreshSelectedUser(this.selectedUser.id);
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    // ========== COPY PERMISSIONS ==========
    closeCopyModal() {
      this.showCopyModal = false;
      this.copyStep = 1;
      this.copySearch = '';
      this.copyTarget = null;
      this.copyRoles = [];
      this.copyOdz = [];
    },

    selectCopyTarget(u) {
      this.copyTarget = u;
      // Load SOURCE user's roles to copy from
      this.copyRoles = [...this.sourceRoles];
      // Load SOURCE user's departments
      const s = this.selectedUser?.allowed_oddzial_ids;
      this.copyOdz = s === null ? this.allOdz.map(o => o.id) : [...(s || [])];
      this.copyStep = 2;
    },

    toggleCopyRole(r) {
      const i = this.copyRoles.indexOf(r);
      i > -1 ? this.copyRoles.splice(i, 1) : this.copyRoles.push(r);
    },

    toggleCopyOdz(id) {
      const i = this.copyOdz.indexOf(id);
      i > -1 ? this.copyOdz.splice(i, 1) : this.copyOdz.push(id);
    },

    async applyCopy() {
      try {
        const params = {
          p_from_user_id: this.selectedUser.id,
          p_to_user_id: this.copyTarget.id,
          p_copy_roles: true,
          p_copy_oddzialy: !this.copyOdzChanged,
        };
        // Only pass arrays if there are changes
        if (this.copyAdded.length) params.p_add_roles = this.copyAdded;
        if (this.copyRemoved.length) params.p_remove_roles = this.copyRemoved;
        if (this.copyOdzChanged) params.p_override_oddzialy = this.copyOdz;
        
        const { data, error } = await this.supabase.rpc('admin_copy_permissions', params);
        if (error) throw error;
        this.showToast('Uprawnienia skopiowane', 'success');
        this.showCopyModal = false;
        this.copyStep = 1;
        await this.loadAll();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    // ========== TEMP GRANTS ==========
    toggleTempOdz(id) {
      const i = this.tempGrantOdz.indexOf(id);
      i > -1 ? this.tempGrantOdz.splice(i, 1) : this.tempGrantOdz.push(id);
    },

    async applyTempGrant() {
      try {
        const exp = new Date(this.tempGrantExp).toISOString();
        let error;
        if (this.tempGrantType === 'role') {
          ({ error } = await this.supabase.rpc('admin_grant_temporary_role', {
            p_user_id: this.selectedUser.id,
            p_role_name: this.tempGrantRole,
            p_expires_at: exp,
            p_reason: this.tempGrantReason || null,
          }));
        } else {
          ({ error } = await this.supabase.rpc('admin_grant_temporary_oddzial', {
            p_user_id: this.selectedUser.id,
            p_oddzial_ids: this.tempGrantOdz,
            p_expires_at: exp,
            p_reason: this.tempGrantReason || null,
          }));
        }
        if (error) throw error;
        this.showToast('Tymczasowy dostęp nadany', 'success');
        this.showTempGrantModal = false;
        this.tempGrantRole = '';
        this.tempGrantOdz = [];
        this.tempGrantExp = '';
        this.tempGrantReason = '';
        await this.loadAll();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    extendGrant(g) {
      this.extendGrant_ = g;
      this.extendDate = '';
      this.showExtendModal = true;
    },

    async doExtend() {
      try {
        const { error } = await this.supabase.rpc('admin_extend_temp_grant', {
          p_grant_id: this.extendGrant_.id,
          p_new_expires_at: new Date(this.extendDate).toISOString(),
        });
        if (error) throw error;
        this.showToast('Przedłużono', 'success');
        this.showExtendModal = false;
        await this.loadTempGrants();
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    async revokeGrantConfirmed(g) {
      try {
        const { error } = await this.supabase.rpc('admin_revoke_temp_grant', { p_grant_id: g.id });
        if (error) throw error;
        this.showToast('Cofnięto', 'success');
        await Promise.all([this.loadTempGrants(), this.loadAll()]);
      } catch (e) {
        this.showToast(e.message, 'error');
      }
    },

    // ========== CONFIRM MODAL ==========
    confirmAction(action, payload) {
      const c = this.content;
      const titles = {
        deleteRole: c.labelConfirmDeleteRoleTitle || 'Usunięcie roli',
        removeRole: c.labelConfirmRemoveRoleTitle || 'Usunięcie roli użytkownikowi',
        revokeGrant: c.labelConfirmRevokeTitle || 'Cofnięcie tymczasowego dostępu',
      };
      const messages = {
        deleteRole: (c.labelConfirmDeleteRole || 'Usunąć rolę "{role}"? To usunie ją od wszystkich użytkowników.').replace('{role}', payload),
        removeRole: (c.labelConfirmRemoveRole || 'Usunąć rolę "{role}" użytkownikowi {user}?')
          .replace('{role}', payload.role)
          .replace('{user}', this.selectedUser?.full_name || ''),
        revokeGrant: c.labelConfirmRevoke || 'Cofnąć tymczasowy dostęp?',
      };
      this.confirmModal = {
        action,
        payload,
        title: titles[action] || 'Potwierdzenie',
        message: messages[action] || 'Czy na pewno?',
      };
    },

    executeConfirmed() {
      if (!this.confirmModal) return;
      const { action, payload } = this.confirmModal;
      this.confirmModal = null;
      if (action === 'deleteRole') this.deleteRoleConfirmed(payload);
      else if (action === 'removeRole') this.removeRoleConfirmed(payload.uid, payload.role);
      else if (action === 'revokeGrant') this.revokeGrantConfirmed(payload);
    },

    // ========== FORMATTING ==========
    toggleAction(tpl, act) {
      const idx = tpl.actions.indexOf(act);
      if (idx > -1) tpl.actions.splice(idx, 1);
      else tpl.actions.push(act);
    },

    hasAllActions(tpl) {
      return ['select','insert','update','delete'].every(a => tpl.actions.includes(a));
    },

    toggleAllActions(tpl) {
      const allActs = ['select','insert','update','delete'];
      if (this.hasAllActions(tpl)) {
        tpl.actions = [];
      } else {
        tpl.actions = [...allActs];
      }
    },

    roleBadgeStyle(role) {
      const dbColor = this.roleColorsMap[role?.toLowerCase()] || this.roleColorsMap[role];
      if (dbColor) return { backgroundColor: dbColor.bg, color: dbColor.fg };
      const c = ROLE_COLORS[role?.toLowerCase()] || { bg: '#333', fg: '#ccc' };
      return { backgroundColor: c.bg, color: c.fg };
    },

    statusLabel(status) {
      const map = {
        active: this.L('labelStatusActive') || 'Aktywny',
        inactive: this.L('labelStatusInactive') || 'Nieaktywny',
        terminated: this.L('labelStatusTerminated') || 'Zwolniony',
        vacation: this.L('labelStatusVacation') || 'Urlop',
      };
      return map[status] || status || '—';
    },

    initials(n) {
      return (n || '').split(' ').map(w => w[0]).join('').substring(0, 2);
    },

    truncate(s, n) {
      return s && s.length > n ? s.substring(0, n) + '…' : s;
    },

    formatDate(d) {
      return d ? new Date(d).toLocaleString('pl-PL') : '';
    },

    formatTimeRemaining(v) {
      if (!v) return '—';
      const s = String(v);
      const m1 = s.match(/(\d+)\s*days?\s*(\d+):(\d+)/);
      if (m1) return `${m1[1]}d ${m1[2]}h ${m1[3]}m`;
      const m2 = s.match(/(\d+):(\d+):(\d+)/);
      if (m2) return `${m2[1]}h ${m2[2]}m`;
      return s;
    },

    isUrgent(e) {
      return e && (new Date(e) - new Date() < 3600000);
    },

    userHasDept(user, deptId) {
      if (!user) return false;
      const ids = user.allowed_oddzial_ids;
      if (ids === null || ids === undefined) return true; // null means all departments
      return Array.isArray(ids) && ids.includes(deptId);
    },

    countUserDepts(user) {
      if (!user) return 0;
      const ids = user.allowed_oddzial_ids;
      if (ids === null || ids === undefined) return this.allOdz.length;
      return Array.isArray(ids) ? ids.length : 0;
    },

    showToast(msg, type = 'info') {
      this.toast = { message: msg, type };
      setTimeout(() => { this.toast = null; }, 3500);
    },
  },
};
</script>

<style scoped>
/* ========== BASE ========== */
.admin-panel { font-family: var(--font); color: var(--text); background: var(--bg); min-height: 100vh; font-size: var(--body-size); }

/* ========== SETUP ========== */
.setup-screen { display: flex; align-items: center; justify-content: center; min-height: 400px; }
.setup-card { text-align: center; padding: 40px; border: 1px dashed var(--border); border-radius: var(--card-radius); max-width: 400px; }

/* ========== LAYOUT ========== */
.layout { display: flex; min-height: 100vh; }

/* ========== SIDEBAR ========== */
.sidebar { width: var(--sidebar-w); border-right: 1px solid var(--sidebar-border); padding: 20px 0; display: flex; flex-direction: column; flex-shrink: 0; background: var(--sidebar-bg); position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.sidebar-brand { padding: 0 20px 20px; border-bottom: 1px solid var(--border); }
.sidebar-name { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
.sidebar-nav { padding: var(--sp-sm); flex: 1; }
.nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; background: 0; border: 0; border-radius: var(--btn-radius); cursor: pointer; color: var(--nav-inactive); font-size: var(--body-size); text-align: left; transition: all var(--anim-dur) var(--anim-ease); font-family: var(--font); }
.nav-btn:hover { background: var(--nav-hover-bg); }
.nav-btn.active { background: var(--nav-active-bg); color: var(--nav-active-color); font-weight: 600; }
.nav-icon { font-size: 15px; opacity: .7; }

/* ========== MAIN ========== */
.main-content { flex: 1; overflow: auto; }
.page { padding: var(--content-pad); max-width: var(--content-max-w); animation: fadeIn var(--anim-dur) var(--anim-ease); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes spin { to { transform: rotate(360deg); } }

/* ========== TYPOGRAPHY & UTILS ========== */
.page-title { font-size: var(--title-size); font-weight: var(--title-weight); margin: 0 0 var(--sp-lg); }
.page-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sp-sm); }
.text-muted { color: var(--text-muted); }
.text-sm { font-size: var(--small-size); }
.text-green { color: #22c55e; }
.text-red { color: #ef4444; }
.mono { font-family: monospace; }
.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
.margin-t-sm { margin-top: var(--sp-sm); }
.margin-t-md { margin-top: var(--sp-md); }
.margin-t-lg { margin-top: var(--sp-lg); }
.margin-b-sm { margin-bottom: var(--sp-sm); }
.margin-b-md { margin-bottom: var(--sp-md); }
.margin-b-lg { margin-bottom: var(--sp-lg); }
.full-width { width: 100%; }

/* ========== STATS ROW ========== */
.stats-row { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-xl); flex-wrap: wrap; }
.stat-card { padding: 20px 16px; border-radius: var(--card-radius); background: var(--card-bg); border: 1px solid var(--border); min-width: 120px; flex: 1; position: relative; overflow: hidden; }
.stat-accent { position: absolute; top: 0; left: 0; width: 3px; height: 100%; border-radius: var(--card-radius) 0 0 var(--card-radius); }
.stat-value { font-size: 28px; font-weight: 700; letter-spacing: -1px; }
.stat-label { margin-top: 4px; font-weight: 500; }

/* ========== GRID ========== */
.grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-md); }

/* ========== CARD ========== */
.card { background: var(--card-bg); border-radius: var(--card-radius); border: 1px solid var(--border); padding: 20px; }
.card.no-pad { padding: 0; }
.card-title { font-size: 14px; font-weight: 600; margin-bottom: var(--sp-md); }

/* ========== ROLE BARS (dashboard) ========== */
.role-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: var(--sp-sm); }
.bar-track { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.bar-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width .5s; }
.bar-count { min-width: 20px; text-align: right; }
.dept-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-light); }

/* ========== TOOLBAR ========== */
.toolbar { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-md); }

/* ========== INPUTS ========== */
.input-field { flex: 1; padding: var(--input-pad); border-radius: var(--input-radius); border: 1px solid var(--input-border); background: var(--input-bg); color: var(--text); font-size: var(--input-size); outline: 0; box-sizing: border-box; font-family: var(--font); }
.input-field:focus { border-color: var(--input-focus); }
.select-field { padding: var(--input-pad); border-radius: var(--input-radius); border: 1px solid var(--select-border); background: var(--select-bg); color: var(--select-text); font-size: var(--select-size); outline: 0; font-family: var(--font); }
.select-field option { background: var(--select-opt-bg); color: var(--select-opt-text); }

/* ========== TABLE ========== */
.table-header { display: grid; grid-template-columns: 1.4fr 1fr 80px 120px; padding: 10px var(--sp-md); font-size: var(--small-size); color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: .8px; border-bottom: 1px solid var(--border); }
.table-row { display: grid; grid-template-columns: 1.4fr 1fr 80px 120px; align-items: center; padding: 12px var(--sp-md); cursor: pointer; border-bottom: 1px solid var(--row-border); transition: background var(--anim-dur); }
.table-row:hover { background: var(--row-hover); }
.table-row.selected { background: var(--row-selected); }
.user-name { font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.user-email { margin-top: 2px; }
.user-dept { margin-top: 1px; font-style: italic; }
.col-roles { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.col-status { display: flex; align-items: center; gap: 6px; }

/* ========== BADGES ========== */
.badge-sa { font-size: 9px; background: #f59e0b; color: #000; padding: 1px 6px; border-radius: 10px; font-weight: 700; }
.badge-vacation { font-size: 9px; background: var(--status-vacation); color: #fff; padding: 1px 6px; border-radius: 10px; font-weight: 700; }
.role-badge { display: inline-flex; align-items: center; gap: 4px; padding: var(--badge-pad); border-radius: var(--badge-radius); font-size: var(--badge-size); font-weight: 600; letter-spacing: .5px; text-transform: uppercase; white-space: nowrap; position: relative; }
.role-badge-sm { display: inline-block; padding: var(--badge-pad); border-radius: var(--badge-radius); font-size: var(--badge-size); font-weight: 600; text-transform: uppercase; letter-spacing: .3px; }
.role-badge.clickable { cursor: pointer; transition: transform .1s, opacity .15s; border: 1px solid transparent; }
.role-badge.clickable:hover { transform: scale(1.08); }
.role-badge.dimmed { opacity: .3; border: 1px dashed rgba(255,255,255,.15); }
.role-badge.role-selected, .role-selected { outline: 2px solid var(--accent); outline-offset: 2px; }
.role-remove { background: 0; border: 0; color: inherit; cursor: pointer; padding: 0; font-size: 13px; line-height: 1; margin-left: 4px; opacity: .6; }
.role-remove:hover { opacity: 1; }
.change-dot { position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; box-shadow: 0 0 0 2px var(--bg); }
.change-dot.green { background: #22c55e; color: #fff; }
.change-dot.red { background: #ef4444; color: #fff; }
.change-hint { font-size: 10px; background: rgba(245,158,11,.15); color: #f59e0b; padding: 2px 8px; border-radius: 10px; font-weight: 400; margin-left: var(--sp-sm); }

/* ========== ACTION BADGES ========== */
.action-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; text-transform: uppercase; }
.action-select { background: #1b3a4e; color: #b8e0ff; }
.action-insert { background: #1b4e3a; color: #b8ffd4; }
.action-update { background: #4e3a1b; color: #ffd4b8; }
.action-delete { background: #4e1b1b; color: #ffb8b8; }
.action-all { background: #2d1b4e; color: #d4b8ff; }
.actions-group { display: flex; gap: 4px; flex-wrap: wrap; }
.action-toggle { font-size: 10px; padding: 3px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase; cursor: pointer; background: var(--card-bg); border: 1px solid var(--border); color: var(--text-muted); transition: all .15s; }
.action-toggle.active { background: var(--action-active-bg); color: var(--action-active-text); border-color: var(--action-active-border); }

/* ========== STATUS ========== */
.status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.status-active { background: var(--status-active); }
.status-terminated { background: var(--status-terminated); }
.status-inactive { background: var(--status-inactive); }
.status-vacation { background: var(--status-vacation); }
.status-text { font-weight: 500; }
.status-text-active { color: var(--status-active-text); }
.status-text-inactive { color: var(--status-inactive-text); }
.status-text-terminated { color: var(--status-terminated-text); }
.status-text-vacation { color: var(--status-vacation-text); }

/* ========== PERMISSIONS ========== */
.permissions-list { background: var(--card-bg); border-radius: var(--input-radius); border: 1px solid var(--border); overflow: hidden; }
.permission-row { display: flex; justify-content: space-between; align-items: center; padding: var(--sp-sm) var(--sp-md); border-bottom: 1px solid var(--border-light); }
.permission-row:last-child { border-bottom: 0; }

/* ========== ROLE TEMPLATES ========== */
.templates-table { border-radius: var(--input-radius); border: 1px solid rgba(255,255,255,.04); overflow: hidden; }
.template-row { display: flex; justify-content: space-between; align-items: center; padding: var(--sp-sm) var(--sp-md); border-bottom: 1px solid rgba(255,255,255,.04); }
.template-row.last { border-bottom: 0; }
.role-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: var(--sp-sm); }
.role-card-actions { display: flex; gap: var(--sp-xs); margin-left: auto; }
.btn-icon-danger { background: 0; border: 0; color: #ef4444; cursor: pointer; font-size: 14px; opacity: .5; transition: opacity .15s; padding: 4px; }
.btn-icon-danger:hover { opacity: 1; }

/* ========== EDIT TEMPLATE ROW ========== */
.edit-template-row { display: flex; gap: var(--sp-sm); align-items: center; margin-bottom: var(--sp-sm); flex-wrap: wrap; }

/* ========== AUDIT ========== */
.audit-row { padding: 14px var(--sp-md); border-bottom: 1px solid var(--border-light); }
.audit-row.last { border-bottom: 0; }
.audit-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.audit-left { display: flex; align-items: center; gap: var(--sp-sm); }
.audit-table-badge { font-size: var(--small-size); font-family: monospace; color: var(--accent); background: rgba(99,102,241,.1); padding: 2px 8px; border-radius: 4px; }
.audit-description { margin-bottom: 4px; white-space: pre-wrap; word-break: break-word; }
.audit-details { margin-bottom: 4px; padding: 6px 10px; background: rgba(255,255,255,.02); border-radius: 6px; border: 1px solid var(--border-light); white-space: pre-wrap; word-break: break-word; font-family: monospace; }

/* ========== TEMP GRANTS ========== */
.temp-countdown { font-size: var(--small-size); font-weight: 600; color: var(--accent); }
.temp-countdown.urgent { color: #ef4444; }
.temp-grant-actions { display: flex; gap: var(--sp-xs); margin-top: var(--sp-xs); }

/* ========== OVERLAY ========== */
.overlay { position: fixed; inset: 0; background: var(--overlay-bg); backdrop-filter: blur(8px); display: flex; justify-content: flex-end; z-index: 10000; }

/* ========== DETAIL PANEL ========== */
.detail-panel { width: var(--panel-width); height: 100%; background: var(--panel-bg); border-left: 1px solid var(--border); overflow-y: auto; animation: slideIn var(--anim-dur) var(--anim-ease); }
.detail-header { padding: var(--sp-lg) var(--sp-lg) var(--sp-md); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
.detail-name { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: var(--sp-sm); }
.detail-actions { display: flex; gap: var(--sp-sm); padding: var(--sp-sm) var(--sp-lg); border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.detail-tabs { display: flex; border-bottom: 1px solid var(--border); }
.detail-tab { flex: 1; padding: 12px var(--sp-sm); background: 0; border: 0; cursor: pointer; font-size: var(--small-size); font-weight: 600; text-transform: uppercase; letter-spacing: .8px; color: var(--text-muted); border-bottom: 2px solid transparent; transition: all .15s; font-family: var(--font); }
.detail-tab.active { color: var(--detail-tab-active-color); border-bottom-color: var(--detail-tab-active-border); }
.detail-body { padding: var(--sp-lg); }

/* ========== MODAL ========== */
.modal { background: var(--modal-bg); border-radius: var(--modal-radius); border: 1px solid var(--border); padding: var(--modal-pad); width: 420px; max-width: var(--modal-width); max-height: 85vh; overflow-y: auto; margin: auto; animation: fadeIn var(--anim-dur) var(--anim-ease); }
.modal.modal-wide { width: var(--modal-width); }
.modal-title { font-size: 17px; font-weight: 700; margin-bottom: 4px; }

/* ========== BUTTONS ========== */
.btn-primary { padding: var(--btn-pad); border-radius: var(--btn-radius); border: 0; cursor: pointer; font-size: var(--btn-size); font-weight: 600; background: var(--btn-bg); color: var(--btn-text); transition: opacity .15s; font-family: var(--font); }
.btn-primary:hover { opacity: .9; }
.btn-primary:disabled { opacity: .4; cursor: not-allowed; }
.btn-primary.modified { background: #f59e0b; color: #000; }
.btn-primary.btn-danger-fill { background: #ef4444; }
.btn-secondary { padding: var(--btn-pad); border-radius: var(--btn-radius); border: 1px solid var(--border); cursor: pointer; font-size: var(--btn-size); font-weight: 600; background: var(--btn2-bg); color: var(--btn2-text); transition: all .15s; font-family: var(--font); }
.btn-secondary:hover { border-color: var(--accent); }
.btn-close { background: 0; border: 0; color: var(--text-muted); cursor: pointer; font-size: 22px; padding: 4px; }
.btn-ghost { padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: var(--small-size); font-weight: 500; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-muted); font-family: var(--font); }
.btn-ghost:disabled { opacity: .4; cursor: not-allowed; }
.btn-ghost.btn-danger, .btn-danger { border-color: #ef4444; color: #ef4444; }

/* ========== COPY MODAL ========== */
.copy-action-row { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-md); }
.copy-target { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 10px; cursor: pointer; margin-bottom: 4px; border: 1px solid var(--border); transition: all .12s; }
.copy-target:hover { background: var(--row-hover); border-color: var(--accent); }
.copy-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: var(--body-size); font-weight: 700; color: #fff; flex-shrink: 0; }
.copy-info { flex: 1; min-width: 0; }
.copy-summary { background: rgba(255,255,255,.02); border-radius: 10px; border: 1px solid var(--border); padding: var(--sp-md); margin-top: var(--sp-md); }

/* ========== ODZ GRID ========== */
.odz-actions { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-sm); }
.odz-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 4px; }
.odz-checkbox { padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: var(--small-size); font-weight: 500; background: var(--card-bg); border: 1px solid var(--border); color: var(--text-muted); transition: all .12s; display: flex; align-items: center; gap: 6px; }
.odz-checkbox.checked { background: rgba(99,102,241,.15); border-color: var(--accent); color: #a5b4fc; }
.checkbox { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .12s; font-size: 10px; font-weight: 700; color: #fff; }
.checkbox.active { background: var(--accent); border-color: var(--accent); }

/* ========== TOGGLE GROUP ========== */
.toggle-group { display: flex; gap: 4px; margin-bottom: var(--sp-md); }
.toggle-btn { flex: 1; padding: var(--sp-sm); border-radius: var(--btn-radius); border: 1px solid var(--border); background: var(--card-bg); color: var(--text-muted); cursor: pointer; font-size: var(--body-size); font-weight: 500; transition: all .15s; font-family: var(--font); }
.toggle-btn.active { background: rgba(99,102,241,.15); border-color: var(--accent); color: #a5b4fc; }

/* ========== SECTION LABELS ========== */
.section-label { font-size: var(--body-size); font-weight: 600; margin-bottom: var(--sp-sm); display: flex; align-items: center; }
.auto-badge { font-size: 10px; color: var(--accent); font-weight: 400; margin-left: var(--sp-sm); }
.roles-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--sp-sm); }
.big-number { font-size: 48px; font-weight: 700; color: var(--accent); text-align: center; margin-bottom: 4px; }

/* ========== PAGINATION ========== */
.pagination { display: flex; align-items: center; justify-content: center; gap: var(--sp-md); margin-top: var(--sp-md); }

/* ========== EMPTY STATE ========== */
.empty-state { padding: var(--sp-lg); text-align: center; color: var(--text-muted); font-size: var(--body-size); }
.empty-state.text-sm { padding: var(--sp-sm); }

/* ========== LOADER ========== */
.loader { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; gap: 12px; }
.spinner { width: 24px; height: 24px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin .8s linear infinite; }

/* ========== TOAST ========== */
.toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; border-radius: var(--btn-radius); font-size: var(--body-size); font-weight: 500; z-index: 99999; animation: fadeIn var(--anim-dur) var(--anim-ease); }
.toast.success { background: var(--toast-ok-bg); color: var(--toast-ok-text); }
.toast.error { background: var(--toast-err-bg); color: var(--toast-err-text); }
.toast.info { background: var(--toast-info-bg); color: var(--toast-info-text); }

/* ========== COLOR PICKER ========== */
.color-row { display: flex; align-items: center; gap: var(--sp-md); margin-bottom: var(--sp-sm); flex-wrap: wrap; }
.color-label { display: flex; align-items: center; gap: 6px; font-size: var(--small-size); font-weight: 500; color: var(--text-muted); }
.color-input { width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; background: none; padding: 0; }

/* ========== SCROLLBAR ========== */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: 0; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .grid-2col { grid-template-columns: 1fr; }
  .table-header, .table-row { grid-template-columns: 1fr 80px; }
  .col-roles { display: none; }
  .page { padding: var(--sp-md); }
  .detail-panel { width: 100%; }
  .modal { width: 95vw; }
}
</style>
