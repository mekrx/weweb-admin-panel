<template>
  <div class="ap" :style="cssVars">
    <div v-if="!supabase" class="setup"><div class="setup-c"><div style="font-size:32px;margin-bottom:12px">⚙</div><div style="font-size:18px;font-weight:700;margin-bottom:8px">Admin Panel</div><div class="m sm">Oczekiwanie na połączenie z Supabase</div></div></div>
    <template v-else>
      <div class="lay">
        <nav v-if="content.showSidebar!==false" class="sb">
          <div class="sb-brand"><div class="sb-name">FBA Admin</div><div class="m sm">v2 Panel</div></div>
          <div class="sb-nav">
            <button v-for="n in navItems" :key="n.id" class="nb" :class="{act:activePage===n.id}" @click="activePage=n.id"><span class="ni">{{n.icon}}</span>{{n.label}}</button>
          </div>
        </nav>
        <main class="mc">
          <div v-if="loading" class="ld"><div class="spin"></div><div class="m sm">Ładowanie...</div></div>
          <!-- DASHBOARD -->
          <div v-else-if="activePage==='dashboard'" class="pg">
            <h1 class="pt">{{L('labelDashboard')}}</h1>
            <div class="sr"><div v-for="s in dashCards" :key="s.l" class="sc"><div class="sa" :style="{background:s.c}"></div><div class="sv">{{s.v}}</div><div class="sl m sm">{{s.l}}</div></div></div>
            <div class="g2">
              <div class="cd"><div class="ct">Rozkład ról</div><div v-for="r in (stats.roles_distribution||[])" :key="r.role" class="rbr"><span class="rb" :style="rbs(r.role)">{{r.role}}</span><div class="bt"><div class="bf" :style="{width:((r.count/Math.max(stats.total_managers,1))*100)+'%'}"></div></div><span class="bc mono m sm">{{r.count}}</span></div></div>
              <div class="cd"><div class="ct">Oddziały</div><div v-for="d in (stats.departments||[])" :key="d.id" class="dr"><span>{{d.name}}</span><span class="mono m sm">{{d.clients}}</span></div></div>
            </div>
          </div>
          <!-- USERS -->
          <div v-else-if="activePage==='users'" class="pg">
            <h1 class="pt">{{L('labelUsers')}}</h1>
            <div class="tb"><input class="si" v-model="sq" :placeholder="L('labelSearch')"/><select class="ss" v-model="fr"><option value="">{{L('labelAllRoles')}}</option><option v-for="r in allRoles" :key="r" :value="r">{{r}}</option></select></div>
            <div class="cd np">
              <div class="th"><span class="cu">UŻYTKOWNIK</span><span class="cr">ROLE</span><span class="co">ODDZIAŁ</span><span class="ck">KLIENCI</span><span class="cs">STATUS</span></div>
              <div v-for="u in fUsers" :key="u.id" class="tr" :class="{sel:selUser&&selUser.id===u.id}" @click="openDetail(u)">
                <div class="cu"><div class="un">{{u.full_name}} <span v-if="u.is_super_admin" class="bsa">{{L('labelSuperAdmin')}}</span><span v-if="u.on_vacation" class="bv">{{L('labelVacation')}}</span></div><div class="ue m sm">{{u.email}}</div></div>
                <div class="cr"><span v-for="r in (u.roles||[]).slice(0,3)" :key="r" class="rbs" :style="rbs(r)">{{r}}</span><span v-if="(u.roles||[]).length>3" class="m sm">+{{u.roles.length-3}}</span></div>
                <div class="co m ell">{{trunc(u.oddzial,16)||'—'}}</div>
                <div class="ck mono">{{u.visible_clients_count}}</div>
                <div class="cs"><span class="sd" :class="'s-'+u.status"></span></div>
              </div>
              <div v-if="fUsers.length===0" class="es">{{L('labelNoResults')}}</div>
            </div>
          </div>
          <!-- ROLES -->
          <div v-else-if="activePage==='roles'" class="pg">
            <div class="ptr"><h1 class="pt">{{L('labelRoles')}}</h1><button v-if="cap.can_create_roles" class="bp" @click="showCR=true">{{L('labelBtnNewRole')}}</button></div>
            <p class="m sm mb-lg">Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.</p>
            <div v-for="rl in rwt" :key="rl.name" class="cd mb-sm">
              <div class="rch"><span class="rb" :style="rbs(rl.name)">{{rl.name}}</span><span class="m sm">{{rl.users_count}} użytk.</span><button v-if="cap.can_create_roles" class="bid" @click="delRole(rl.name)">✕</button></div>
              <div v-if="rl.templates&&rl.templates.length" class="tt"><div v-for="(t,i) in rl.templates" :key="t.table_name" class="ttr" :class="{last:i===rl.templates.length-1}"><span class="mono">{{t.table_name}}</span><div class="ag"><span v-for="a in t.actions" :key="a" class="ab" :class="'a-'+a">{{a}}</span></div></div></div>
              <div v-else class="es sm">Brak szablonów</div>
            </div>
          </div>
          <!-- AUDIT -->
          <div v-else-if="activePage==='audit'" class="pg">
            <h1 class="pt">{{L('labelAudit')}}</h1>
            <div class="tb"><select class="ss" v-model="af" @change="loadAudit"><option value="">{{L('labelAuditAllTables')}}</option><option v-for="t in auditTbls" :key="t" :value="t">{{t}}</option></select><input class="si" v-model="au" :placeholder="L('labelAuditEmailPlaceholder')" @input="debAudit"/></div>
            <div class="cd np">
              <div v-for="(a,i) in aLogs" :key="a.id" class="ar" :class="{last:i===aLogs.length-1}">
                <div class="at"><div class="al"><span class="atb">{{a.table_label||a.table_name}}</span></div><span class="m sm">{{fmtD(a.created_at)}}</span></div>
                <div class="ad">{{a.human_description||a.description}}</div>
                <div class="m sm">{{a.user_name||a.user_email}}</div>
              </div>
              <div v-if="aLogs.length===0" class="es">Brak wpisów</div>
            </div>
          </div>
          <!-- TEMP GRANTS -->
          <div v-else-if="activePage==='temp'" class="pg">
            <h1 class="pt">{{L('labelTemp')}}</h1>
            <div class="cd np">
              <div v-for="(g,i) in tGrants" :key="g.id" class="ar" :class="{last:i===tGrants.length-1}">
                <div class="at">
                  <div class="al"><span class="rbs" :style="g.grant_type==='role'?rbs(g.role_name):{}">{{g.grant_type==='role'?g.role_name:g.oddzial_name}}</span><span class="m sm">→ {{g.user_name}}</span></div>
                  <span class="tc" :class="{urg:isUrg(g.expires_at)}">{{fmtTR(g.time_remaining)}}</span>
                </div>
                <div class="m sm">Nadane przez: {{g.created_by}} {{g.reason?'— '+g.reason:''}}</div>
                <div class="tga"><button class="bx" @click="extendGrant(g)">Przedłuż</button><button class="bx bd" @click="revokeGrant(g)">Cofnij</button></div>
              </div>
              <div v-if="tGrants.length===0" class="es">Brak aktywnych tymczasowych uprawnień</div>
            </div>
          </div>
        </main>
      </div>
      <!-- USER DETAIL -->
      <div v-if="selUser" class="ov" @click.self="selUser=null">
        <div class="dp">
          <div class="dh"><div><div class="dn">{{selUser.full_name}} <span v-if="selUser.is_super_admin" class="bsa">SA</span></div><div class="m sm">{{selUser.email}}</div><div class="m sm">Oddział: {{selUser.oddzial||'—'}}</div></div><button class="bc2" @click="selUser=null">✕</button></div>
          <div class="da"><button class="bp" @click="showCopy=true">{{L('labelBtnCopy')}}</button><button class="bs" @click="showAR=true">{{L('labelBtnAddRole')}}</button><button v-if="cap.can_grant_temporary" class="bs" @click="showTG=true">{{L('labelBtnTempAccess')}}</button></div>
          <div class="dt"><button v-for="t in dTabs" :key="t.id" class="dtb" :class="{act:dTab===t.id}" @click="dTab=t.id">{{t.label}}</button></div>
          <div class="db">
            <div v-if="dTab==='roles'">
              <div class="sl">{{L('labelAssignedRoles')}}</div>
              <div class="rw"><span v-for="r in (selUser.roles||[])" :key="r" class="rb" :style="rbs(r)">{{r}}<button class="rr" @click="remRole(selUser.id,r)">✕</button></span><span v-if="!(selUser.roles||[]).length" class="m sm">Brak ról</span></div>
              <div class="sl mt-lg">{{L('labelPermissions')}} <span v-if="selUser.is_auto_generated" class="aut">auto z ról</span></div>
              <div class="pl"><div v-for="(acts,tbl) in (selUser.permissions||{})" :key="tbl" class="pr"><span class="mono">{{tbl}}</span><div class="ag"><span v-for="a in (Array.isArray(acts)?acts:[acts])" :key="a" class="ab" :class="'a-'+a">{{a}}</span></div></div><div v-if="!Object.keys(selUser.permissions||{}).length" class="es sm">Super admin — pełny dostęp</div></div>
            </div>
            <div v-if="dTab==='visibility'"><div class="bn">{{selUser.visible_clients_count}}</div><div class="m sm" style="text-align:center">{{L('labelVisibleClients')}}</div></div>
          </div>
        </div>
      </div>
      <!-- ADD ROLE MODAL -->
      <div v-if="showAR&&selUser" class="ov" @click.self="showAR=false"><div class="md"><div class="mt">Dodaj rolę — {{selUser.full_name}}</div><div class="rw"><span v-for="r in avRoles" :key="r" class="rb cl" :style="rbs(r)" @click="addRole(selUser.id,r)">{{r}}</span><span v-if="!avRoles.length" class="m sm">Wszystkie przypisane</span></div></div></div>
      <!-- COPY MODAL -->
      <div v-if="showCopy&&selUser" class="ov" @click.self="showCopy=false">
        <div class="md wd">
          <template v-if="cpStep===1"><div class="mt">Kopiuj z {{selUser.full_name}}</div><div class="m sm mb-md">Wybierz cel</div><input class="si" v-model="cpS" placeholder="Szukaj..."/><div v-for="u in cpTargets" :key="u.id" class="cpt" @click="selCpTarget(u)"><div class="cpa">{{ini(u.full_name)}}</div><div class="cpi"><div style="font-weight:600">{{u.full_name}}</div><div class="m sm">{{u.email}}</div></div></div></template>
          <template v-if="cpStep===2"><div class="mt">Sprawdź i dostosuj</div><div class="m sm mb-md">{{selUser.full_name}} → {{cpTarget.full_name}}</div>
            <div class="car"><button class="bs sm2" @click="cpStep=1">← Zmień cel</button><button class="bp sm2" :class="{mod:cpHasChanges}" @click="applyCopy">{{cpHasChanges?L('labelBtnApplyModified'):L('labelBtnApply')}}</button></div>
            <div class="sl">Role <span v-if="cpAdded.length||cpRemoved.length" class="cht">{{cpAdded.length?'+'+cpAdded.length:''}}{{cpRemoved.length?' -'+cpRemoved.length:''}} zmienione</span></div>
            <div class="rw"><span v-for="r in allRoles" :key="r" class="rb cl" :style="rbs(r)" :class="{dim:!cpRoles.includes(r)}" @click="togCpR(r)">{{r}}<span v-if="cpRoles.includes(r)&&!srcRoles.includes(r)" class="chd g">+</span><span v-if="!cpRoles.includes(r)&&srcRoles.includes(r)" class="chd re">−</span></span></div>
            <div class="sl mt-md">Oddziały <span v-if="cpOdzChg" class="cht">zmienione</span></div>
            <div class="oa"><button class="bx" @click="cpOdz=allOdz.map(o=>o.id)">Zaznacz wszystkie</button><button class="bx" @click="cpOdz=[]">Wyczyść</button></div>
            <div class="og"><div v-for="o in allOdz" :key="o.id" class="oc" :class="{ac:cpOdz.includes(o.id)}" @click="togCpO(o.id)"><div class="cb" :class="{ch:cpOdz.includes(o.id)}"><span v-if="cpOdz.includes(o.id)">✓</span></div>{{o.name}}</div></div>
            <div class="cps"><div class="sl sm">Podsumowanie</div><div class="m sm">Cel: <strong>{{cpTarget.full_name}}</strong></div><div class="m sm">Role ({{cpRoles.length}}): {{cpRoles.join(', ')||'brak'}}</div><div v-if="cpAdded.length" class="sm gt">+ {{cpAdded.join(', ')}}</div><div v-if="cpRemoved.length" class="sm rt">− {{cpRemoved.join(', ')}}</div><div class="m sm">Oddziały: {{cpOdz.length}} z {{allOdz.length}}</div></div>
          </template>
        </div>
      </div>
      <!-- TEMP GRANT MODAL -->
      <div v-if="showTG&&selUser" class="ov" @click.self="showTG=false">
        <div class="md wd">
          <div class="mt">Tymczasowy dostęp — {{selUser.full_name}}</div>
          <div class="sl">{{L('labelTempType')}}</div>
          <div class="tgr"><button class="tgb" :class="{ac:tgType==='role'}" @click="tgType='role';tgRole='';tgOdz=[]">{{L('labelTempRole')}}</button><button class="tgb" :class="{ac:tgType==='oddzial'}" @click="tgType='oddzial';tgRole='';tgOdz=[]">{{L('labelTempDept')}}</button></div>
          <template v-if="tgType==='role'"><div class="sl">Wybierz rolę</div><div class="rw"><span v-for="r in allRoles" :key="r" class="rb cl" :style="rbs(r)" :class="{'rsel':tgRole===r}" @click="tgRole=r">{{r}}</span></div></template>
          <template v-if="tgType==='oddzial'"><div class="sl">Wybierz oddziały</div><div class="og"><div v-for="o in allOdz" :key="o.id" class="oc" :class="{ac:tgOdz.includes(o.id)}" @click="togTgO(o.id)"><div class="cb" :class="{ch:tgOdz.includes(o.id)}"><span v-if="tgOdz.includes(o.id)">✓</span></div>{{o.name}}</div></div></template>
          <div class="sl mt-md">{{L('labelTempExpires')}}</div><input type="datetime-local" class="si" v-model="tgExp"/>
          <div class="sl mt-md">{{L('labelTempReason')}}</div><input class="si" v-model="tgReason" placeholder="np. zastępstwo za..."/>
          <button class="bp mt-md fw" @click="applyTG" :disabled="!canTG">{{L('labelTempApply')}}</button>
        </div>
      </div>
      <!-- EXTEND GRANT MODAL -->
      <div v-if="showExtend" class="ov" @click.self="showExtend=false"><div class="md"><div class="mt">Przedłuż dostęp</div><div class="sl mt-sm">Nowa data wygaśnięcia</div><input type="datetime-local" class="si" v-model="extDate"/><button class="bp mt-md fw" @click="doExtend" :disabled="!extDate">Zapisz</button></div></div>
      <!-- CREATE ROLE MODAL -->
      <div v-if="showCR" class="ov" @click.self="showCR=false"><div class="md"><div class="mt">Nowa rola</div><input class="si" v-model="newRN" placeholder="Nazwa roli..."/><button class="bp mt-sm fw" @click="createRole" :disabled="!newRN.trim()">Utwórz</button></div></div>
      <div v-if="toast" class="tst" :class="toast.type">{{toast.message}}</div>
    </template>
  </div>
</template>
<script>
import{createClient}from'@supabase/supabase-js';
const RC={admin:{bg:'#1a1a2e',fg:'#e0e0ff'},dyrektor:{bg:'#2d1b4e',fg:'#d4b8ff'},wicedyrektor:{bg:'#3a1f5e',fg:'#d4b8ff'},teamlead:{bg:'#1b3a4e',fg:'#b8e0ff'},koordynator:{bg:'#1b4e3a',fg:'#b8ffd4'},hr:{bg:'#4e1b3a',fg:'#ffb8d4'},legalizacja:{bg:'#4e3a1b',fg:'#ffd4b8'},archiwizacja:{bg:'#3a4e1b',fg:'#d4ffb8'},korespondencja:{bg:'#1b4e4e',fg:'#b8ffff'},kontroling:{bg:'#4e4e1b',fg:'#ffffb8'},onboarding:{bg:'#1b2e4e',fg:'#b8d4ff'}};
export default{
  props:{content:{type:Object,required:true}},
  data(){return{supabase:null,loading:true,activePage:'dashboard',dTab:'roles',sq:'',fr:'',
    stats:{},users:[],rwt:[],allRoles:[],allOdz:[],aLogs:[],tGrants:[],cap:{},
    selUser:null,showAR:false,showCopy:false,showTG:false,showCR:false,showExtend:false,toast:null,
    af:'',au:'',auditTbls:['archiwum','oplaty','managers','users_roles','user_permissions','vacations','korespondencja','role_permissions','temporary_grants'],
    cpStep:1,cpS:'',cpTarget:null,cpRoles:[],cpOdz:[],
    tgType:'role',tgRole:'',tgOdz:[],tgExp:'',tgReason:'',
    newRN:'',extDate:'',extGrant:null,
    _adTimer:null,_debTimer:null}},
  computed:{
    cssVars(){const c=this.content;return{
      '--accent':c.accentColor||'#6366f1','--accent-h':c.accentHoverColor||'rgba(99,102,241,0.12)',
      '--bg':c.bgColor||'#0f0f0f','--cbg':c.cardBgColor||'#1c1c1c','--cr':c.cardBorderRadius||'12px',
      '--brd':c.borderColor||'#2a2a28','--brl':c.borderLightColor||'rgba(255,255,255,0.02)',
      '--tx':c.textColor||'#e8e6e1','--txm':c.textMutedColor||'#8a8880',
      '--ts':c.titleFontSize||'24px','--tw':c.titleFontWeight||'700','--bs2':c.bodyFontSize||'13px','--ss':c.smallFontSize||'11px',
      '--ff':c.fontFamily||"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      '--bds':c.badgeFontSize||'11px','--bdp':c.badgePadding||'3px 10px','--bdr':c.badgeBorderRadius||'20px',
      '--ibg':c.inputBgColor||'#1c1c1c','--ibd':c.inputBorderColor||'#2a2a28','--ifc':c.inputFocusBorderColor||'#6366f1','--ir':c.inputBorderRadius||'8px','--ip':c.inputPadding||'10px 14px','--ifs':c.inputFontSize||'13px',
      '--sbg':c.selectBgColor||'#1c1c1c','--stx':c.selectTextColor||'#e8e6e1','--sbd':c.selectBorderColor||'#2a2a28','--sfs':c.selectFontSize||'13px','--sob':c.selectOptionBg||'#1c1c1c','--sot':c.selectOptionText||'#e8e6e1',
      '--bbg':c.btnPrimaryBg||'#6366f1','--btx':c.btnPrimaryText||'#fff','--b2bg':c.btnSecondaryBg||'#1c1c1c','--b2tx':c.btnSecondaryText||'#e8e6e1','--brr':c.btnBorderRadius||'8px','--bpp':c.btnPadding||'8px 14px','--bfs':c.btnFontSize||'12px',
      '--rh':c.tableRowHoverBg||'rgba(99,102,241,0.06)','--rs':c.tableRowSelectedBg||'rgba(99,102,241,0.12)','--rb2':c.tableRowBorderColor||'rgba(255,255,255,0.02)',
      '--sa':c.statusActiveColor||'#22c55e','--si2':c.statusInactiveColor||'#eab308','--st':c.statusTerminatedColor||'#ef4444','--sv2':c.statusVacationColor||'#6366f1',
      '--ovbg':c.overlayBgColor||'rgba(0,0,0,0.6)','--pw':c.panelWidth||'540px','--pbg':c.panelBgColor||'#1c1c1c',
      '--mbg':c.modalBgColor||'#1c1c1c','--mr':c.modalBorderRadius||'16px','--mw':c.modalMaxWidth||'560px','--mp':c.modalPadding||'24px',
      '--tok-bg':c.toastSuccessBg||'#065f46','--tok-tx':c.toastSuccessText||'#a7f3d0','--ter-bg':c.toastErrorBg||'#7f1d1d','--ter-tx':c.toastErrorText||'#fca5a5','--tin-bg':c.toastInfoBg||'#1e3a5f','--tin-tx':c.toastInfoText||'#93c5fd',
      '--ad':c.animationDuration||'200ms','--ae':c.animationEasing||'ease-out',
      '--xs':c.spacingXs||'4px','--sm2':c.spacingSm||'8px','--md2':c.spacingMd||'16px','--lg2':c.spacingLg||'24px','--xl2':c.spacingXl||'32px',
      '--sbw':c.sidebarWidth||'220px','--sbbg':c.sidebarBgColor||'#161616','--sbbd':c.sidebarBorderColor||'#2a2a28',
      '--cp':c.contentPadding||'32px','--cmw':c.contentMaxWidth||'1100px',
      '--nac':c.navActiveColor||'#6366f1','--nab':c.navActiveBg||'rgba(99,102,241,0.12)','--nic':c.navInactiveColor||'#8a8880','--nhb':c.navHoverBg||'rgba(99,102,241,0.06)',
    }},
    navItems(){const c=this.content;return[{id:'dashboard',label:c.labelDashboard||'Dashboard',icon:'◈'},{id:'users',label:c.labelUsers||'Użytkownicy',icon:'◎'},{id:'roles',label:c.labelRoles||'Role',icon:'◇'},{id:'audit',label:c.labelAudit||'Audyt',icon:'◫'},{id:'temp',label:c.labelTemp||'Tymczasowe',icon:'⏱'}].filter(i=>this.cap.can_view_audit!==false||i.id!=='audit')},
    dTabs(){return[{id:'roles',label:this.content.labelTabRoles||'Role i uprawnienia'},{id:'visibility',label:this.content.labelTabVisibility||'Widoczność klientów'}]},
    dashCards(){const s=this.stats;return[{v:s.total_managers||0,l:'Aktywni menedżerowie',c:'#22c55e'},{v:s.active_clients||0,l:'Aktywni klienci',c:'#6366f1'},{v:s.on_vacation_now||0,l:'Na urlopie',c:'#f59e0b'},{v:s.pending_vacations||0,l:'Oczekujące urlopy',c:'#ef4444'},{v:s.recent_changes_24h||0,l:'Zmiany 24h',c:'#8b5cf6'}]},
    fUsers(){return this.users.filter(u=>{const s=!this.sq||u.full_name.toLowerCase().includes(this.sq.toLowerCase())||u.email.toLowerCase().includes(this.sq.toLowerCase());const r=!this.fr||(u.roles||[]).includes(this.fr);return s&&r})},
    avRoles(){return this.selUser?this.allRoles.filter(r=>!(this.selUser.roles||[]).includes(r)):[]},
    cpTargets(){return this.selUser?this.users.filter(u=>u.id!==this.selUser.id&&(!this.cpS||u.full_name.toLowerCase().includes(this.cpS.toLowerCase())||u.email.toLowerCase().includes(this.cpS.toLowerCase()))):[]},
    srcRoles(){return this.selUser?(this.selUser.roles||[]):[]},
    cpAdded(){return this.cpRoles.filter(r=>!this.srcRoles.includes(r))},
    cpRemoved(){return this.srcRoles.filter(r=>!this.cpRoles.includes(r))},
    cpOdzChg(){return[...(this.selUser?.allowed_oddzial_ids||[])].sort().join(',')!==[...this.cpOdz].sort().join(',')},
    cpHasChanges(){return this.cpAdded.length>0||this.cpRemoved.length>0||this.cpOdzChg},
    canTG(){return!!this.tgExp&&(this.tgType==='role'?!!this.tgRole:this.tgOdz.length>0)},
  },
  watch:{
    'content.supabaseUrl'(){this.initSB()},
    'content.supabaseAnonKey'(){this.initSB()},
    activePage(p){if(p==='audit')this.loadAudit();if(p==='temp')this.loadTG();if(p==='roles')this.loadRoles()},
  },
  mounted(){this.initSB();setTimeout(()=>{if(!this.supabase)this.initSB()},1000);setTimeout(()=>{if(!this.supabase)this.initSB()},3000)},
  unmounted(){if(this._adTimer)clearInterval(this._adTimer);if(this._debTimer)clearTimeout(this._debTimer)},
  methods:{
    L(k){return this.content[k]||''},
    async initSB(){try{if(typeof wwLib!=='undefined'){const i=wwLib?.wwPlugins?.supabase?.instance||wwLib?.wwPlugins?.supabaseAuth?.publicInstance;if(i){this.supabase=i;await this.loadAll();return}}const u=this.content.supabaseUrl,k=this.content.supabaseAnonKey;if(u&&k){this.supabase=createClient(u,k);await this.loadAll();return}this.supabase=null}catch(e){console.error(e);this.showT('Błąd połączenia','error')}},
    async loadAll(){this.loading=true;try{const[s,u,c,r,o]=await Promise.all([this.supabase.rpc('admin_dashboard_stats'),this.supabase.rpc('get_admin_users_overview'),this.supabase.rpc('admin_get_my_capabilities'),this.supabase.rpc('admin_get_roles_with_templates'),this.supabase.from('oddzialy').select('id,oddzial').order('oddzial')]);this.stats=s.data||{};this.users=u.data||[];this.cap=c.data||{};this.rwt=r.data||[];this.allRoles=this.rwt.map(x=>x.name);this.allOdz=(o.data||[]).map(x=>({id:x.id,name:x.oddzial}))}catch(e){console.error(e);this.showT('Błąd ładowania','error')}this.loading=false},
    async loadAudit(){const{data}=await this.supabase.rpc('admin_get_audit_trail',{p_table_name:this.af||null,p_user_email:this.au||null,p_limit:100});this.aLogs=data?.records||[];this.setupAR()},
    setupAR(){if(this._adTimer)clearInterval(this._adTimer);if(this.content.auditAutoRefresh!==false){this._adTimer=setInterval(()=>{if(this.activePage==='audit')this.loadAudit()},(this.content.auditRefreshInterval||3)*1000)}},
    debAudit(){if(this._debTimer)clearTimeout(this._debTimer);this._debTimer=setTimeout(()=>this.loadAudit(),400)},
    async loadTG(){const{data}=await this.supabase.rpc('admin_get_temporary_grants');this.tGrants=data||[]},
    async loadRoles(){const{data}=await this.supabase.rpc('admin_get_roles_with_templates');this.rwt=data||[];this.allRoles=this.rwt.map(x=>x.name)},
    openDetail(u){this.selUser=u;this.dTab='roles'},
    async addRole(uid,rn){const{error}=await this.supabase.rpc('admin_assign_role',{p_user_id:uid,p_role_name:rn});if(error){this.showT(error.message,'error');return}this.showT(`Rola ${rn} przypisana`,'success');this.showAR=false;await this.loadAll();this.selUser=this.users.find(u=>u.id===uid)||null},
    async remRole(uid,rn){const c=this.content;const msg=(c.labelConfirmRemoveRole||'Usunąć rolę "{role}" użytkownikowi {user}?').replace('{role}',rn).replace('{user}',this.selUser?.full_name||'');if(!confirm(msg))return;const{error}=await this.supabase.rpc('admin_remove_role',{p_user_id:uid,p_role_name:rn});if(error){this.showT(error.message,'error');return}this.showT(`Rola ${rn} usunięta`,'success');await this.loadAll();this.selUser=this.users.find(u=>u.id===uid)||null},
    async createRole(){const{error}=await this.supabase.rpc('admin_create_role',{p_role_name:this.newRN.trim()});if(error){this.showT(error.message,'error');return}this.showT('Rola utworzona','success');this.showCR=false;this.newRN='';await this.loadRoles()},
    async delRole(rn){const msg=(this.content.labelConfirmDeleteRole||'Usunąć rolę "{role}"?').replace('{role}',rn);if(!confirm(msg))return;const{error}=await this.supabase.rpc('admin_delete_role',{p_role_name:rn});if(error){this.showT(error.message,'error');return}this.showT('Rola usunięta','success');await this.loadRoles()},
    selCpTarget(u){this.cpTarget=u;this.cpRoles=[...this.srcRoles];const s=this.selUser?.allowed_oddzial_ids;this.cpOdz=s===null?this.allOdz.map(o=>o.id):[...(s||[])];this.cpStep=2},
    togCpR(r){const i=this.cpRoles.indexOf(r);i>-1?this.cpRoles.splice(i,1):this.cpRoles.push(r)},
    togCpO(id){const i=this.cpOdz.indexOf(id);i>-1?this.cpOdz.splice(i,1):this.cpOdz.push(id)},
    async applyCopy(){const p={p_from_user_id:this.selUser.id,p_to_user_id:this.cpTarget.id,p_copy_roles:true,p_copy_oddzialy:!this.cpOdzChg,p_add_roles:this.cpAdded.length?this.cpAdded:null,p_remove_roles:this.cpRemoved.length?this.cpRemoved:null,p_override_oddzialy:this.cpOdzChg?this.cpOdz:null};const{error}=await this.supabase.rpc('admin_copy_permissions',p);if(error){this.showT(error.message,'error');return}this.showT('Uprawnienia skopiowane','success');this.showCopy=false;this.cpStep=1;await this.loadAll()},
    togTgO(id){const i=this.tgOdz.indexOf(id);i>-1?this.tgOdz.splice(i,1):this.tgOdz.push(id)},
    async applyTG(){const exp=new Date(this.tgExp).toISOString();let error;if(this.tgType==='role')({error}=await this.supabase.rpc('admin_grant_temporary_role',{p_user_id:this.selUser.id,p_role_name:this.tgRole,p_expires_at:exp,p_reason:this.tgReason||null}));else({error}=await this.supabase.rpc('admin_grant_temporary_oddzial',{p_user_id:this.selUser.id,p_oddzial_ids:this.tgOdz,p_expires_at:exp,p_reason:this.tgReason||null}));if(error){this.showT(error.message,'error');return}this.showT('Tymczasowy dostęp nadany','success');this.showTG=false;this.tgRole='';this.tgOdz=[];this.tgExp='';this.tgReason='';await this.loadAll()},
    extendGrant(g){this.extGrant=g;this.extDate='';this.showExtend=true},
    async doExtend(){const{error}=await this.supabase.rpc('admin_extend_temp_grant',{p_grant_id:this.extGrant.id,p_new_expires_at:new Date(this.extDate).toISOString()});if(error){this.showT(error.message,'error');return}this.showT('Przedłużono','success');this.showExtend=false;await this.loadTG()},
    async revokeGrant(g){if(!confirm(this.content.labelConfirmRevoke||'Cofnąć tymczasowy dostęp?'))return;const{error}=await this.supabase.rpc('admin_revoke_temp_grant',{p_grant_id:g.id});if(error){this.showT(error.message,'error');return}this.showT('Cofnięto','success');await this.loadTG()},
    rbs(r){const c=RC[r]||{bg:'#333',fg:'#ccc'};return{backgroundColor:c.bg,color:c.fg}},
    ini(n){return(n||'').split(' ').map(w=>w[0]).join('').substring(0,2)},
    trunc(s,n){return s&&s.length>n?s.substring(0,n)+'…':s},
    fmtD(d){return d?new Date(d).toLocaleString('pl-PL'):''},
    fmtTR(v){if(!v)return'—';const s=String(v);const m1=s.match(/(\d+)\s*days?\s*(\d+):(\d+)/);if(m1)return`${m1[1]}d ${m1[2]}h ${m1[3]}m`;const m2=s.match(/(\d+):(\d+):(\d+)/);if(m2)return`${m2[1]}h ${m2[2]}m`;return s},
    isUrg(e){return e&&(new Date(e)-new Date()<3600000)},
    showT(msg,type='info'){this.toast={message:msg,type};setTimeout(()=>{this.toast=null},3000)},
  }
};
</script>
<style scoped>
.ap{font-family:var(--ff);color:var(--tx);background:var(--bg);min-height:100vh;font-size:var(--bs2)}
.setup{display:flex;align-items:center;justify-content:center;min-height:400px}
.setup-c{text-align:center;padding:40px;border:1px dashed var(--brd);border-radius:var(--cr);max-width:400px}
.lay{display:flex;min-height:100vh}
.sb{width:var(--sbw);border-right:1px solid var(--sbbd);padding:20px 0;display:flex;flex-direction:column;flex-shrink:0;background:var(--sbbg)}
.sb-brand{padding:0 20px 20px;border-bottom:1px solid var(--brd)}
.sb-name{font-size:18px;font-weight:700;letter-spacing:-0.5px}
.sb-nav{padding:var(--sm2);flex:1}
.nb{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;background:0;border:0;border-radius:var(--brr);cursor:pointer;color:var(--nic);font-size:var(--bs2);text-align:left;transition:all var(--ad) var(--ae)}
.nb:hover{background:var(--nhb)}
.nb.act{background:var(--nab);color:var(--nac);font-weight:600}
.ni{font-size:15px;opacity:.7}
.mc{flex:1;overflow:auto}
.pg{padding:var(--cp);max-width:var(--cmw);animation:fi var(--ad) var(--ae)}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes sp{to{transform:rotate(360deg)}}
.pt{font-size:var(--ts);font-weight:var(--tw);margin:0 0 var(--lg2)}
.ptr{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sm2)}
.sr{display:flex;gap:var(--sm2);margin-bottom:var(--xl2);flex-wrap:wrap}
.sc{padding:20px 16px;border-radius:var(--cr);background:var(--cbg);border:1px solid var(--brd);min-width:120px;flex:1;position:relative;overflow:hidden}
.sa{position:absolute;top:0;left:0;width:3px;height:100%;border-radius:var(--cr) 0 0 var(--cr)}
.sv{font-size:28px;font-weight:700;letter-spacing:-1px}
.sl2{font-size:var(--ss);color:var(--txm);margin-top:4px;font-weight:500}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:var(--md2)}
.cd{background:var(--cbg);border-radius:var(--cr);border:1px solid var(--brd);padding:20px}
.cd.np{padding:0}
.ct{font-size:14px;font-weight:600;margin-bottom:var(--md2)}
.rbr{display:flex;align-items:center;gap:10px;margin-bottom:var(--sm2)}
.bt{flex:1;height:4px;background:var(--brd);border-radius:2px;overflow:hidden}
.bf{height:100%;background:var(--accent);border-radius:2px;transition:width .5s}
.bc{font-size:var(--ss);min-width:20px;text-align:right}
.dr{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--brl);font-size:var(--bs2)}
.tb{display:flex;gap:var(--sm2);margin-bottom:var(--md2)}
.si{flex:1;padding:var(--ip);border-radius:var(--ir);border:1px solid var(--ibd);background:var(--ibg);color:var(--tx);font-size:var(--ifs);outline:0;box-sizing:border-box;font-family:var(--ff)}
.si:focus{border-color:var(--ifc)}
.ss{padding:var(--ip);border-radius:var(--ir);border:1px solid var(--sbd);background:var(--sbg);color:var(--stx);font-size:var(--sfs);outline:0;font-family:var(--ff)}
.ss option{background:var(--sob);color:var(--sot);font-family:var(--ff);font-size:var(--sfs)}
.th{display:grid;grid-template-columns:1.4fr 180px 120px 80px 60px;padding:10px var(--md2);font-size:var(--ss);color:var(--txm);font-weight:600;text-transform:uppercase;letter-spacing:.8px;border-bottom:1px solid var(--brd)}
.tr{display:grid;grid-template-columns:1.4fr 180px 120px 80px 60px;align-items:center;padding:12px var(--md2);cursor:pointer;border-bottom:1px solid var(--rb2);transition:background var(--ad)}
.tr:hover{background:var(--rh)}
.tr.sel{background:var(--rs)}
.un{font-weight:600;font-size:14px;display:flex;align-items:center;gap:6px;white-space:nowrap}
.ue{margin-top:2px}
.ell{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px}
.bsa{font-size:9px;background:#f59e0b;color:#000;padding:1px 6px;border-radius:10px;font-weight:700}
.bv{font-size:9px;background:var(--sv2);color:#fff;padding:1px 6px;border-radius:10px;font-weight:700}
.rb{display:inline-flex;align-items:center;gap:4px;padding:var(--bdp);border-radius:var(--bdr);font-size:var(--bds);font-weight:600;letter-spacing:.5px;text-transform:uppercase;white-space:nowrap;position:relative}
.rbs{display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.rb.cl{cursor:pointer;transition:transform .1s,opacity .15s;border:1px solid transparent}
.rb.cl:hover{transform:scale(1.08)}
.rb.dim{opacity:.3;border:1px dashed rgba(255,255,255,.15)}
.rb.rsel,.rsel{outline:2px solid var(--accent);outline-offset:2px}
.rr{background:0;border:0;color:inherit;cursor:pointer;padding:0;font-size:13px;line-height:1;margin-left:4px;opacity:.6}
.chd{position:absolute;top:-5px;right:-5px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;box-shadow:0 0 0 2px var(--bg)}
.chd.g{background:#22c55e;color:#fff}
.chd.re{background:#ef4444;color:#fff}
.cht{font-size:10px;background:rgba(245,158,11,.15);color:#f59e0b;padding:2px 8px;border-radius:10px;font-weight:400;margin-left:var(--sm2)}
.ab{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;text-transform:uppercase}
.a-select{background:#1b3a4e;color:#b8e0ff}
.a-insert{background:#1b4e3a;color:#b8ffd4}
.a-update{background:#4e3a1b;color:#ffd4b8}
.a-delete{background:#4e1b1b;color:#ffb8b8}
.a-all{background:#2d1b4e;color:#d4b8ff}
.ag{display:flex;gap:4px}
.sd{width:8px;height:8px;border-radius:50%;display:inline-block}
.s-active{background:var(--sa)}
.s-terminated{background:var(--st)}
.s-inactive{background:var(--si2)}
.pl{background:var(--cbg);border-radius:var(--ir);border:1px solid var(--brd);overflow:hidden}
.pr{display:flex;justify-content:space-between;align-items:center;padding:var(--sm2) var(--md2);border-bottom:1px solid var(--brl)}
.pr:last-child{border-bottom:0}
.tt{border-radius:var(--ir);border:1px solid rgba(255,255,255,.04);overflow:hidden}
.ttr{display:flex;justify-content:space-between;align-items:center;padding:var(--sm2) var(--md2);border-bottom:1px solid rgba(255,255,255,.04)}
.ttr.last{border-bottom:0}
.rch{display:flex;align-items:center;gap:10px;margin-bottom:var(--sm2)}
.bid{background:0;border:0;color:#ef4444;cursor:pointer;font-size:14px;margin-left:auto;opacity:.5;transition:opacity .15s}
.bid:hover{opacity:1}
.ar{padding:14px var(--md2);border-bottom:1px solid var(--brl)}
.ar.last{border-bottom:0}
.at{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.al{display:flex;align-items:center;gap:var(--sm2)}
.atb{font-size:var(--ss);font-family:monospace;color:var(--accent);background:rgba(99,102,241,.1);padding:2px 8px;border-radius:4px}
.ad{font-size:var(--bs2);margin-bottom:4px;white-space:pre-wrap;word-break:break-word}
.tc{font-size:var(--ss);font-weight:600;color:var(--accent)}
.tc.urg{color:#ef4444}
.tga{display:flex;gap:var(--xs);margin-top:var(--xs)}
.ov{position:fixed;inset:0;background:var(--ovbg);backdrop-filter:blur(8px);display:flex;justify-content:flex-end;z-index:10000}
.dp{width:var(--pw);height:100%;background:var(--pbg);border-left:1px solid var(--brd);overflow-y:auto;animation:si var(--ad) var(--ae)}
.dh{padding:var(--lg2) var(--lg2) var(--md2);border-bottom:1px solid var(--brd);display:flex;justify-content:space-between;align-items:flex-start}
.dn{font-size:20px;font-weight:700;display:flex;align-items:center;gap:var(--sm2)}
.da{display:flex;gap:var(--sm2);padding:var(--sm2) var(--lg2);border-bottom:1px solid var(--brd);flex-wrap:wrap}
.dt{display:flex;border-bottom:1px solid var(--brd)}
.dtb{flex:1;padding:12px var(--sm2);background:0;border:0;cursor:pointer;font-size:var(--ss);font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--txm);border-bottom:2px solid transparent;transition:all .15s}
.dtb.act{color:var(--nac);border-bottom-color:var(--nac)}
.db{padding:var(--lg2)}
.md{background:var(--mbg);border-radius:var(--mr);border:1px solid var(--brd);padding:var(--mp);width:420px;max-width:var(--mw);max-height:85vh;overflow-y:auto;margin:auto;animation:fi var(--ad) var(--ae)}
.md.wd{width:var(--mw)}
.mt{font-size:17px;font-weight:700;margin-bottom:4px}
.car{display:flex;gap:var(--sm2);margin-bottom:var(--md2)}
.cpt{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;cursor:pointer;margin-bottom:4px;border:1px solid var(--brd);transition:all .12s}
.cpt:hover{background:var(--rh);border-color:var(--accent)}
.cpa{width:36px;height:36px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:var(--bs2);font-weight:700;color:#fff;flex-shrink:0}
.cpi{flex:1;min-width:0}
.oa{display:flex;gap:var(--sm2);margin-bottom:var(--sm2)}
.og{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:4px}
.oc{padding:7px 10px;border-radius:6px;cursor:pointer;font-size:var(--ss);font-weight:500;background:var(--cbg);border:1px solid var(--brd);color:var(--txm);transition:all .12s;display:flex;align-items:center;gap:6px}
.oc.ac{background:rgba(99,102,241,.15);border-color:var(--accent);color:#a5b4fc}
.cb{width:14px;height:14px;border-radius:3px;border:1.5px solid var(--brd);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .12s;font-size:10px;font-weight:700;color:#fff}
.cb.ch{background:var(--accent);border-color:var(--accent)}
.cps{background:rgba(255,255,255,.02);border-radius:10px;border:1px solid var(--brd);padding:var(--md2);margin-top:var(--md2)}
.tgr{display:flex;gap:4px;margin-bottom:var(--md2)}
.tgb{flex:1;padding:var(--sm2);border-radius:var(--brr);border:1px solid var(--brd);background:var(--cbg);color:var(--txm);cursor:pointer;font-size:var(--bs2);font-weight:500;transition:all .15s}
.tgb.ac{background:rgba(99,102,241,.15);border-color:var(--accent);color:#a5b4fc}
.bp{padding:var(--bpp);border-radius:var(--brr);border:0;cursor:pointer;font-size:var(--bfs);font-weight:600;background:var(--bbg);color:var(--btx);transition:opacity .15s}
.bp:hover{opacity:.9}
.bp:disabled{opacity:.4;cursor:not-allowed}
.bp.mod{background:#f59e0b;color:#000}
.bp.sm2{padding:6px 12px;font-size:var(--ss)}
.bs{padding:var(--bpp);border-radius:var(--brr);border:1px solid var(--brd);cursor:pointer;font-size:var(--bfs);font-weight:600;background:var(--b2bg);color:var(--b2tx);transition:all .15s}
.bs:hover{border-color:var(--accent)}
.bs.sm2{padding:6px 12px;font-size:var(--ss)}
.bc2{background:0;border:0;color:var(--txm);cursor:pointer;font-size:22px;padding:4px}
.bx{padding:5px 10px;border-radius:6px;cursor:pointer;font-size:var(--ss);font-weight:500;border:1px solid var(--brd);background:var(--cbg);color:var(--txm)}
.bx.bd{border-color:#ef4444;color:#ef4444}
.sl{font-size:var(--bs2);font-weight:600;margin-bottom:var(--sm2);display:flex;align-items:center}
.sl.sm{font-size:var(--ss)}
.aut{font-size:10px;color:var(--accent);font-weight:400;margin-left:var(--sm2)}
.rw{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--sm2)}
.m{color:var(--txm)}
.sm{font-size:var(--ss)}
.mono{font-family:monospace}
.bn{font-size:48px;font-weight:700;color:var(--accent);text-align:center;margin-bottom:4px}
.gt{color:#22c55e}
.rt{color:#ef4444}
.es{padding:var(--lg2);text-align:center;color:var(--txm);font-size:var(--bs2)}
.es.sm{padding:var(--sm2)}
.mt-sm{margin-top:var(--sm2)}
.mt-md{margin-top:var(--md2)}
.mt-lg{margin-top:var(--lg2)}
.mb-sm{margin-bottom:var(--sm2)}
.mb-md{margin-bottom:var(--md2)}
.mb-lg{margin-bottom:var(--lg2)}
.fw{width:100%}
.ld{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;gap:12px}
.spin{width:24px;height:24px;border:2px solid var(--brd);border-top-color:var(--accent);border-radius:50%;animation:sp .8s linear infinite}
.tst{position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:var(--brr);font-size:var(--bs2);font-weight:500;z-index:99999;animation:fi var(--ad) var(--ae)}
.tst.success{background:var(--tok-bg);color:var(--tok-tx)}
.tst.error{background:var(--ter-bg);color:var(--ter-tx)}
.tst.info{background:var(--tin-bg);color:var(--tin-tx)}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:0}
::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
</style>
