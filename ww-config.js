export default {
    editor: {
        label: { en: 'Admin Panel', pl: 'Panel administracyjny' },
        icon: 'settings',
        customStylePropertiesOrder: [
            ['supabaseUrl', 'supabaseAnonKey'],
            ['showSidebar','labelSidebarTitle','labelSidebarSubtitle','sidebarWidth','sidebarBgColor','sidebarBorderColor'],
            ['navActiveColor','navActiveBg','navInactiveColor','navHoverBg'],
            ['contentPadding','contentMaxWidth'],
            ['accentColor','accentHoverColor','bgColor','cardBgColor','cardBorderRadius'],
            ['borderColor','borderLightColor'],
            ['textColor','textMutedColor','textHintColor'],
            ['titleFontSize','titleFontWeight','bodyFontSize','smallFontSize','fontFamily'],
            ['badgeFontSize','badgePadding','badgeBorderRadius'],
            ['inputBgColor','inputBorderColor','inputFocusBorderColor','inputBorderRadius','inputPadding','inputFontSize'],
            ['selectBgColor','selectTextColor','selectBorderColor','selectFontSize','selectOptionBg','selectOptionText'],
            ['btnPrimaryBg','btnPrimaryText','btnSecondaryBg','btnSecondaryText','btnBorderRadius','btnPadding','btnFontSize'],
            ['tableHeaderBg','tableRowHoverBg','tableRowSelectedBg','tableRowBorderColor'],
            ['statusActiveColor','statusInactiveColor','statusTerminatedColor','statusVacationColor'],
            ['statusActiveTextColor','statusInactiveTextColor','statusTerminatedTextColor','statusVacationTextColor'],
            ['actionActiveBg','actionActiveText','actionActiveBorder'],
            ['roleBadgeDefaultBg','roleBadgeDefaultText'],
            ['overlayBgColor','panelWidth','panelBgColor'],
            ['modalBgColor','modalBorderRadius','modalMaxWidth','modalPadding'],
            ['toastSuccessBg','toastSuccessText','toastErrorBg','toastErrorText','toastInfoBg','toastInfoText'],
            ['animationDuration','animationEasing'],
            ['spacingXs','spacingSm','spacingMd','spacingLg','spacingXl'],
            ['auditAutoRefresh','auditRefreshInterval'],
            ['labelDashboard','labelUsers','labelRoles','labelAudit','labelTemp'],
            ['labelStatManagers','labelStatClients','labelStatVacation','labelStatPending','labelStatChanges','labelStatTempGrants','labelStatRolesCount','labelStatDepts'],
            ['showStatManagers','showStatClients','showStatVacation','showStatPending','showStatChanges','showStatTempGrants','showStatRolesCount','showStatDepts'],
            ['labelRolesDistribution','labelDepartments'],
            ['labelColUser','labelColRoles','labelColDept','labelColClients','labelColStatus'],
            ['labelStatusActive','labelStatusInactive','labelStatusTerminated','labelStatusVacation'],
            ['labelBtnCopy','labelBtnAddRole','labelBtnTempAccess','labelBtnNewRole','labelBtnEditRole','labelBtnEditPerms','labelBtnApply','labelBtnApplyModified'],
            ['labelBtnExtend','labelBtnRevoke','labelGrantedBy','labelExpiresAt'],
            ['labelSearch','labelAllRoles','labelNoResults','labelSuperAdmin','labelVacation','labelPrev','labelNext'],
            ['labelTabRoles','labelTabVisibility','labelAssignedRoles','labelPermissions','labelVisibleClients'],
            ['labelAutoFromRoles','labelNoRoles','labelSuperAdminAccess','labelNoPermissions','labelAllRolesAssigned'],
            ['labelAddRoleFor','labelDept'],
            ['labelCopyFrom','labelSelectTarget','labelReviewCopy','labelChangeTarget','labelChanged','labelSummary','labelTarget','labelNone','labelOf','labelSelectAll','labelClearAll'],
            ['labelTempAccessFor','labelTempType','labelTempRole','labelTempDept','labelTempExpires','labelTempReason','labelTempReasonPlaceholder','labelTempApply'],
            ['labelSelectRole','labelSelectDepts'],
            ['labelExtendAccess','labelNewExpiry','labelSave','labelCreate','labelCancel','labelConfirm'],
            ['labelNewRole','labelRoleNamePlaceholder','labelEditRole','labelTemplates','labelSelectTable','labelAddTemplate','labelNoTemplates'],
            ['labelRolesHint','labelUsersCount'],
            ['labelEditPermsFor','labelEditPermsHint','labelAddPermission'],
            ['labelAuditAllTables','labelAuditEmailPlaceholder','labelNoAuditEntries'],
            ['labelNoTempGrants'],
            ['labelConfirmDeleteRole','labelConfirmDeleteRoleTitle','labelConfirmRemoveRole','labelConfirmRemoveRoleTitle','labelConfirmRevoke','labelConfirmRevokeTitle']
        ]
    },
    properties: {
        // === CONNECTION ===
        supabaseUrl: { label:{en:'Supabase URL'}, type:'Text', defaultValue:'', bindable:true, section:'settings' },
        supabaseAnonKey: { label:{en:'Supabase Anon Key'}, type:'Text', defaultValue:'', bindable:true, section:'settings' },

        // === SIDEBAR ===
        showSidebar: { label:{en:'Show Sidebar'}, type:'OnOff', defaultValue:true, bindable:true, responsive:true },
        labelSidebarTitle: { label:{en:'Sidebar Title'}, type:'Text', defaultValue:'', bindable:true },
        labelSidebarSubtitle: { label:{en:'Sidebar Subtitle'}, type:'Text', defaultValue:'', bindable:true },
        sidebarWidth: { label:{en:'Sidebar Width'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:140,max:400}]}, defaultValue:'220px', bindable:true, responsive:true },
        sidebarBgColor: { label:{en:'Sidebar BG'}, type:'Color', defaultValue:'#161616', bindable:true, responsive:true },
        sidebarBorderColor: { label:{en:'Sidebar Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },

        // === NAV ===
        navActiveColor: { label:{en:'Nav Active Text'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        navActiveBg: { label:{en:'Nav Active BG'}, type:'Color', defaultValue:'rgba(99,102,241,0.12)', bindable:true, responsive:true },
        navInactiveColor: { label:{en:'Nav Inactive Text'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },
        navHoverBg: { label:{en:'Nav Hover BG'}, type:'Color', defaultValue:'rgba(99,102,241,0.06)', bindable:true, responsive:true },

        // === CONTENT ===
        contentPadding: { label:{en:'Content Padding'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:8,max:80}]}, defaultValue:'32px', bindable:true, responsive:true },
        contentMaxWidth: { label:{en:'Content Max W'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:600,max:2000}]}, defaultValue:'1100px', bindable:true, responsive:true },

        // === COLORS ===
        accentColor: { label:{en:'Accent'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        accentHoverColor: { label:{en:'Accent Hover'}, type:'Color', defaultValue:'rgba(99,102,241,0.12)', bindable:true, responsive:true },
        bgColor: { label:{en:'Background'}, type:'Color', defaultValue:'#0f0f0f', bindable:true, responsive:true },
        cardBgColor: { label:{en:'Card BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        cardBorderRadius: { label:{en:'Card Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:24}]}, defaultValue:'12px', bindable:true, responsive:true },
        borderColor: { label:{en:'Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },
        borderLightColor: { label:{en:'Light Border'}, type:'Color', defaultValue:'rgba(255,255,255,0.02)', bindable:true, responsive:true },
        textColor: { label:{en:'Text'}, type:'Color', defaultValue:'#e8e6e1', bindable:true, responsive:true },
        textMutedColor: { label:{en:'Muted'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },
        textHintColor: { label:{en:'Hint'}, type:'Color', defaultValue:'#5a5950', bindable:true, responsive:true },

        // === TYPOGRAPHY ===
        titleFontSize: { label:{en:'Title Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:16,max:40}]}, defaultValue:'24px', bindable:true, responsive:true },
        titleFontWeight: { label:{en:'Title Weight'}, type:'TextSelect', options:{options:[{value:'400',label:{en:'Regular'}},{value:'500',label:{en:'Medium'}},{value:'600',label:{en:'Semi Bold'}},{value:'700',label:{en:'Bold'}}]}, defaultValue:'700', bindable:true, responsive:true },
        bodyFontSize: { label:{en:'Body Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:20}]}, defaultValue:'13px', bindable:true, responsive:true },
        smallFontSize: { label:{en:'Small Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:8,max:16}]}, defaultValue:'11px', bindable:true, responsive:true },
        fontFamily: { label:{en:'Font'}, type:'Text', defaultValue:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", bindable:true },

        // === BADGES ===
        badgeFontSize: { label:{en:'Badge Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:8,max:16}]}, defaultValue:'11px', bindable:true, responsive:true },
        badgePadding: { label:{en:'Badge Pad'}, type:'Text', defaultValue:'3px 10px', bindable:true },
        badgeBorderRadius: { label:{en:'Badge Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:30}]}, defaultValue:'20px', bindable:true, responsive:true },

        // === INPUTS ===
        inputBgColor: { label:{en:'Input BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        inputBorderColor: { label:{en:'Input Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },
        inputFocusBorderColor: { label:{en:'Input Focus'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        inputBorderRadius: { label:{en:'Input Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:20}]}, defaultValue:'8px', bindable:true, responsive:true },
        inputPadding: { label:{en:'Input Pad'}, type:'Text', defaultValue:'10px 14px', bindable:true },
        inputFontSize: { label:{en:'Input Font'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:18}]}, defaultValue:'13px', bindable:true, responsive:true },

        // === SELECTS ===
        selectBgColor: { label:{en:'Select BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        selectTextColor: { label:{en:'Select Text'}, type:'Color', defaultValue:'#e8e6e1', bindable:true, responsive:true },
        selectBorderColor: { label:{en:'Select Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },
        selectFontSize: { label:{en:'Select Font'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:18}]}, defaultValue:'13px', bindable:true, responsive:true },
        selectOptionBg: { label:{en:'Option BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true },
        selectOptionText: { label:{en:'Option Text'}, type:'Color', defaultValue:'#e8e6e1', bindable:true },

        // === BUTTONS ===
        btnPrimaryBg: { label:{en:'Btn BG'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        btnPrimaryText: { label:{en:'Btn Text'}, type:'Color', defaultValue:'#ffffff', bindable:true, responsive:true },
        btnSecondaryBg: { label:{en:'Btn2 BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        btnSecondaryText: { label:{en:'Btn2 Text'}, type:'Color', defaultValue:'#e8e6e1', bindable:true, responsive:true },
        btnBorderRadius: { label:{en:'Btn Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:20}]}, defaultValue:'8px', bindable:true, responsive:true },
        btnPadding: { label:{en:'Btn Pad'}, type:'Text', defaultValue:'8px 14px', bindable:true },
        btnFontSize: { label:{en:'Btn Font'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:18}]}, defaultValue:'12px', bindable:true, responsive:true },

        // === TABLE ===
        tableHeaderBg: { label:{en:'Header BG'}, type:'Color', defaultValue:'transparent', bindable:true, responsive:true },
        tableRowHoverBg: { label:{en:'Row Hover'}, type:'Color', defaultValue:'rgba(99,102,241,0.06)', bindable:true, responsive:true },
        tableRowSelectedBg: { label:{en:'Row Selected'}, type:'Color', defaultValue:'rgba(99,102,241,0.12)', bindable:true, responsive:true },
        tableRowBorderColor: { label:{en:'Row Border'}, type:'Color', defaultValue:'rgba(255,255,255,0.02)', bindable:true, responsive:true },

        // === STATUS DOTS ===
        statusActiveColor: { label:{en:'Active Dot'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statusInactiveColor: { label:{en:'Inactive Dot'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statusTerminatedColor: { label:{en:'Terminated Dot'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statusVacationColor: { label:{en:'Vacation Dot'}, type:'Color', defaultValue:'#6366f1', bindable:true },

        // === STATUS TEXT ===
        statusActiveTextColor: { label:{en:'Active Text'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statusInactiveTextColor: { label:{en:'Inactive Text'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statusTerminatedTextColor: { label:{en:'Terminated Text'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statusVacationTextColor: { label:{en:'Vacation Text'}, type:'Color', defaultValue:'#6366f1', bindable:true },

        // === ACTION TOGGLE (role/permission editor) ===
        actionActiveBg: { label:{en:'Action Active BG'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        actionActiveText: { label:{en:'Action Active Text'}, type:'Color', defaultValue:'#ffffff', bindable:true },
        actionActiveBorder: { label:{en:'Action Active Border'}, type:'Color', defaultValue:'#6366f1', bindable:true },

        // === ROLE BADGE DEFAULTS ===
        roleBadgeDefaultBg: { label:{en:'Role Badge Default BG'}, type:'Color', defaultValue:'#333333', bindable:true },
        roleBadgeDefaultText: { label:{en:'Role Badge Default Text'}, type:'Color', defaultValue:'#cccccc', bindable:true },

        // === OVERLAY / PANEL ===
        overlayBgColor: { label:{en:'Overlay BG'}, type:'Color', defaultValue:'rgba(0,0,0,0.6)', bindable:true },
        panelWidth: { label:{en:'Panel W'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:300,max:800}]}, defaultValue:'540px', bindable:true, responsive:true },
        panelBgColor: { label:{en:'Panel BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true },

        // === MODAL ===
        modalBgColor: { label:{en:'Modal BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true },
        modalBorderRadius: { label:{en:'Modal Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:30}]}, defaultValue:'16px', bindable:true },
        modalMaxWidth: { label:{en:'Modal W'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:300,max:800}]}, defaultValue:'560px', bindable:true },
        modalPadding: { label:{en:'Modal Pad'}, type:'Text', defaultValue:'24px', bindable:true },

        // === TOAST ===
        toastSuccessBg: { label:{en:'Toast OK BG'}, type:'Color', defaultValue:'#065f46', bindable:true },
        toastSuccessText: { label:{en:'Toast OK Text'}, type:'Color', defaultValue:'#a7f3d0', bindable:true },
        toastErrorBg: { label:{en:'Toast Err BG'}, type:'Color', defaultValue:'#7f1d1d', bindable:true },
        toastErrorText: { label:{en:'Toast Err Text'}, type:'Color', defaultValue:'#fca5a5', bindable:true },
        toastInfoBg: { label:{en:'Toast Info BG'}, type:'Color', defaultValue:'#1e3a5f', bindable:true },
        toastInfoText: { label:{en:'Toast Info Text'}, type:'Color', defaultValue:'#93c5fd', bindable:true },

        // === ANIMATION ===
        animationDuration: { label:{en:'Anim Duration'}, type:'Length', options:{unitChoices:[{value:'ms',label:'ms',min:0,max:1000}]}, defaultValue:'200ms', bindable:true },
        animationEasing: { label:{en:'Easing'}, type:'TextSelect', options:{options:[{value:'ease',label:{en:'ease'}},{value:'ease-out',label:{en:'ease-out'}},{value:'ease-in-out',label:{en:'ease-in-out'}},{value:'linear',label:{en:'linear'}},{value:'cubic-bezier(0.16,1,0.3,1)',label:{en:'smooth'}}]}, defaultValue:'ease-out', bindable:true },

        // === SPACING ===
        spacingXs: { label:{en:'XS'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:16}]}, defaultValue:'4px', bindable:true, responsive:true },
        spacingSm: { label:{en:'SM'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:24}]}, defaultValue:'8px', bindable:true, responsive:true },
        spacingMd: { label:{en:'MD'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:40}]}, defaultValue:'16px', bindable:true, responsive:true },
        spacingLg: { label:{en:'LG'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:60}]}, defaultValue:'24px', bindable:true, responsive:true },
        spacingXl: { label:{en:'XL'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:80}]}, defaultValue:'32px', bindable:true, responsive:true },

        // === AUDIT ===
        auditAutoRefresh: { label:{en:'Auto-Refresh'}, type:'OnOff', defaultValue:true, bindable:true },
        auditRefreshInterval: { label:{en:'Refresh (sec)'}, type:'Number', options:{min:1,max:60,step:1}, defaultValue:3, bindable:true },

        // === NAV LABELS ===
        labelDashboard: { label:{en:'Nav: Dashboard tab', pl:'Zakładka Dashboard'}, type:'Text', defaultValue:'Dashboard', bindable:true },
        labelUsers: { label:{en:'Nav: Users tab', pl:'Zakładka Użytkownicy'}, type:'Text', defaultValue:'Użytkownicy', bindable:true },
        labelRoles: { label:{en:'Nav: Roles tab', pl:'Zakładka Role'}, type:'Text', defaultValue:'Role', bindable:true },
        labelAudit: { label:{en:'Nav: Audit tab', pl:'Zakładka Audyt'}, type:'Text', defaultValue:'Audyt', bindable:true },
        labelTemp: { label:{en:'Nav: Temporary tab', pl:'Zakładka Tymczasowe'}, type:'Text', defaultValue:'Tymczasowe', bindable:true },

        // === DASHBOARD STAT LABELS ===
        labelStatManagers: { label:{en:'Stat: Managers'}, type:'Text', defaultValue:'Aktywni menedżerowie', bindable:true },
        labelStatClients: { label:{en:'Stat: Clients'}, type:'Text', defaultValue:'Aktywni klienci', bindable:true },
        labelStatVacation: { label:{en:'Stat: On Vacation'}, type:'Text', defaultValue:'Na urlopie', bindable:true },
        labelStatPending: { label:{en:'Stat: Pending'}, type:'Text', defaultValue:'Oczekujące urlopy', bindable:true },
        labelStatChanges: { label:{en:'Stat: Changes 24h'}, type:'Text', defaultValue:'Zmiany 24h', bindable:true },
        labelStatTempGrants: { label:{en:'Stat: Temp Grants'}, type:'Text', defaultValue:'Aktywne tymcz. dostępy', bindable:true },
        labelStatRolesCount: { label:{en:'Stat: Roles Count'}, type:'Text', defaultValue:'Zdefiniowane role', bindable:true },
        labelStatDepts: { label:{en:'Stat: Departments'}, type:'Text', defaultValue:'Oddziały', bindable:true },
        showStatManagers: { label:{en:'Show: Managers'}, type:'OnOff', defaultValue:true, bindable:true },
        showStatClients: { label:{en:'Show: Clients'}, type:'OnOff', defaultValue:true, bindable:true },
        showStatVacation: { label:{en:'Show: Vacation'}, type:'OnOff', defaultValue:true, bindable:true },
        showStatPending: { label:{en:'Show: Pending'}, type:'OnOff', defaultValue:true, bindable:true },
        showStatChanges: { label:{en:'Show: Changes 24h'}, type:'OnOff', defaultValue:true, bindable:true },
        showStatTempGrants: { label:{en:'Show: Temp Grants'}, type:'OnOff', defaultValue:false, bindable:true },
        showStatRolesCount: { label:{en:'Show: Roles Count'}, type:'OnOff', defaultValue:false, bindable:true },
        showStatDepts: { label:{en:'Show: Departments'}, type:'OnOff', defaultValue:false, bindable:true },
        labelRolesDistribution: { label:{en:'Section: Roles Distribution'}, type:'Text', defaultValue:'Rozkład ról', bindable:true },
        labelDepartments: { label:{en:'Section: Departments'}, type:'Text', defaultValue:'Oddziały', bindable:true },

        // === TABLE COLUMN LABELS ===
        labelColUser: { label:{en:'Col: User'}, type:'Text', defaultValue:'UŻYTKOWNIK', bindable:true },
        labelColRoles: { label:{en:'Col: Roles'}, type:'Text', defaultValue:'ROLE', bindable:true },
        labelColDept: { label:{en:'Col: Dept'}, type:'Text', defaultValue:'ODDZIAŁ', bindable:true },
        labelColClients: { label:{en:'Col: Clients'}, type:'Text', defaultValue:'KLIENCI', bindable:true },
        labelColStatus: { label:{en:'Col: Status'}, type:'Text', defaultValue:'STATUS', bindable:true },

        // === STATUS LABELS ===
        labelStatusActive: { label:{en:'Status: Active'}, type:'Text', defaultValue:'Aktywny', bindable:true },
        labelStatusInactive: { label:{en:'Status: Inactive'}, type:'Text', defaultValue:'Nieaktywny', bindable:true },
        labelStatusTerminated: { label:{en:'Status: Terminated'}, type:'Text', defaultValue:'Zwolniony', bindable:true },
        labelStatusVacation: { label:{en:'Status: Vacation'}, type:'Text', defaultValue:'Urlop', bindable:true },

        // === BUTTON LABELS ===
        labelBtnCopy: { label:{en:'Btn: Copy Perms'}, type:'Text', defaultValue:'Kopiuj uprawnienia na...', bindable:true },
        labelBtnAddRole: { label:{en:'Btn: Add Role'}, type:'Text', defaultValue:'+ Dodaj rolę', bindable:true },
        labelBtnTempAccess: { label:{en:'Btn: Temp Access'}, type:'Text', defaultValue:'⏱ Tymczasowy dostęp', bindable:true },
        labelBtnNewRole: { label:{en:'Btn: New Role'}, type:'Text', defaultValue:'+ Nowa rola', bindable:true },
        labelBtnEditRole: { label:{en:'Btn: Edit Role'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnEditPerms: { label:{en:'Btn: Edit Perms'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnApply: { label:{en:'Btn: Apply'}, type:'Text', defaultValue:'Zastosuj kopię', bindable:true },
        labelBtnApplyModified: { label:{en:'Btn: Apply Modified'}, type:'Text', defaultValue:'Zastosuj ze zmianami', bindable:true },
        labelBtnExtend: { label:{en:'Btn: Extend'}, type:'Text', defaultValue:'Przedłuż', bindable:true },
        labelBtnRevoke: { label:{en:'Btn: Revoke'}, type:'Text', defaultValue:'Cofnij', bindable:true },
        labelGrantedBy: { label:{en:'Label: Granted By'}, type:'Text', defaultValue:'Nadane przez', bindable:true },
        labelExpiresAt: { label:{en:'Label: Expires At'}, type:'Text', defaultValue:'Wygasa', bindable:true },

        // === SEARCH / FILTER ===
        labelSearch: { label:{en:'Placeholder: Search'}, type:'Text', defaultValue:'Szukaj po nazwisku lub email...', bindable:true },
        labelAllRoles: { label:{en:'Label: All Roles'}, type:'Text', defaultValue:'Wszystkie role', bindable:true },
        labelNoResults: { label:{en:'Label: No Results'}, type:'Text', defaultValue:'Brak wyników', bindable:true },
        labelSuperAdmin: { label:{en:'Badge: Super Admin'}, type:'Text', defaultValue:'SuperAdmin', bindable:true },
        labelVacation: { label:{en:'Badge: Vacation'}, type:'Text', defaultValue:'URLOP', bindable:true },
        labelPrev: { label:{en:'Pagination: Prev'}, type:'Text', defaultValue:'Wstecz', bindable:true },
        labelNext: { label:{en:'Pagination: Next'}, type:'Text', defaultValue:'Dalej', bindable:true },

        // === DETAIL TABS ===
        labelTabRoles: { label:{en:'Tab: Roles'}, type:'Text', defaultValue:'Role i uprawnienia', bindable:true },
        labelTabVisibility: { label:{en:'Tab: Visibility'}, type:'Text', defaultValue:'Widoczność klientów', bindable:true },
        labelAssignedRoles: { label:{en:'Section: Assigned Roles'}, type:'Text', defaultValue:'Przypisane role', bindable:true },
        labelPermissions: { label:{en:'Section: Permissions'}, type:'Text', defaultValue:'Uprawnienia', bindable:true },
        labelVisibleClients: { label:{en:'Label: Visible Clients'}, type:'Text', defaultValue:'widocznych klientów', bindable:true },
        labelAutoFromRoles: { label:{en:'Label: Auto From Roles'}, type:'Text', defaultValue:'auto z ról', bindable:true },
        labelNoRoles: { label:{en:'Label: No Roles'}, type:'Text', defaultValue:'Brak ról', bindable:true },
        labelSuperAdminAccess: { label:{en:'Label: SA Access'}, type:'Text', defaultValue:'Super admin — pełny dostęp', bindable:true },
        labelNoPermissions: { label:{en:'Label: No Perms'}, type:'Text', defaultValue:'Brak uprawnień', bindable:true },
        labelAllRolesAssigned: { label:{en:'Label: All Assigned'}, type:'Text', defaultValue:'Wszystkie role przypisane', bindable:true },
        labelAddRoleFor: { label:{en:'Modal: Add Role For'}, type:'Text', defaultValue:'Dodaj rolę —', bindable:true },
        labelDept: { label:{en:'Label: Dept'}, type:'Text', defaultValue:'Oddział', bindable:true },

        // === COPY MODAL ===
        labelCopyFrom: { label:{en:'Copy: From'}, type:'Text', defaultValue:'Kopiuj z', bindable:true },
        labelSelectTarget: { label:{en:'Copy: Select Target'}, type:'Text', defaultValue:'Wybierz cel', bindable:true },
        labelReviewCopy: { label:{en:'Copy: Review'}, type:'Text', defaultValue:'Sprawdź i dostosuj', bindable:true },
        labelChangeTarget: { label:{en:'Copy: Change Target'}, type:'Text', defaultValue:'Zmień cel', bindable:true },
        labelChanged: { label:{en:'Copy: Changed'}, type:'Text', defaultValue:'zmienione', bindable:true },
        labelSummary: { label:{en:'Copy: Summary'}, type:'Text', defaultValue:'Podsumowanie', bindable:true },
        labelTarget: { label:{en:'Copy: Target'}, type:'Text', defaultValue:'Cel', bindable:true },
        labelNone: { label:{en:'Copy: None'}, type:'Text', defaultValue:'brak', bindable:true },
        labelOf: { label:{en:'Copy: Of'}, type:'Text', defaultValue:'z', bindable:true },
        labelSelectAll: { label:{en:'Copy: Select All'}, type:'Text', defaultValue:'Zaznacz wszystkie', bindable:true },
        labelClearAll: { label:{en:'Copy: Clear All'}, type:'Text', defaultValue:'Wyczyść', bindable:true },

        // === TEMP GRANT MODAL ===
        labelTempAccessFor: { label:{en:'Temp: Access For'}, type:'Text', defaultValue:'Tymczasowy dostęp —', bindable:true },
        labelTempType: { label:{en:'Temp: Type'}, type:'Text', defaultValue:'Typ', bindable:true },
        labelTempRole: { label:{en:'Temp: Role'}, type:'Text', defaultValue:'Rola', bindable:true },
        labelTempDept: { label:{en:'Temp: Dept'}, type:'Text', defaultValue:'Oddział', bindable:true },
        labelTempExpires: { label:{en:'Temp: Expires'}, type:'Text', defaultValue:'Wygasa (czas polski)', bindable:true },
        labelTempReason: { label:{en:'Temp: Reason'}, type:'Text', defaultValue:'Powód (opcjonalnie)', bindable:true },
        labelTempReasonPlaceholder: { label:{en:'Temp: Reason Placeholder'}, type:'Text', defaultValue:'np. zastępstwo za...', bindable:true },
        labelTempApply: { label:{en:'Temp: Apply Btn'}, type:'Text', defaultValue:'Nadaj tymczasowy dostęp', bindable:true },
        labelSelectRole: { label:{en:'Temp: Select Role'}, type:'Text', defaultValue:'Wybierz rolę', bindable:true },
        labelSelectDepts: { label:{en:'Temp: Select Depts'}, type:'Text', defaultValue:'Wybierz oddziały', bindable:true },

        // === EXTEND / OTHER MODALS ===
        labelExtendAccess: { label:{en:'Extend: Title'}, type:'Text', defaultValue:'Przedłuż dostęp', bindable:true },
        labelNewExpiry: { label:{en:'Extend: New Expiry'}, type:'Text', defaultValue:'Nowa data wygaśnięcia', bindable:true },
        labelSave: { label:{en:'Btn: Save'}, type:'Text', defaultValue:'Zapisz', bindable:true },
        labelCreate: { label:{en:'Btn: Create'}, type:'Text', defaultValue:'Utwórz', bindable:true },
        labelCancel: { label:{en:'Btn: Cancel'}, type:'Text', defaultValue:'Anuluj', bindable:true },
        labelConfirm: { label:{en:'Btn: Confirm'}, type:'Text', defaultValue:'Potwierdź', bindable:true },

        // === ROLE EDITING ===
        labelNewRole: { label:{en:'Modal: New Role'}, type:'Text', defaultValue:'Nowa rola', bindable:true },
        labelRoleNamePlaceholder: { label:{en:'Role: Name Placeholder'}, type:'Text', defaultValue:'Nazwa roli...', bindable:true },
        labelEditRole: { label:{en:'Modal: Edit Role'}, type:'Text', defaultValue:'Edycja roli', bindable:true },
        labelTemplates: { label:{en:'Section: Templates'}, type:'Text', defaultValue:'Szablony uprawnień', bindable:true },
        labelSelectTable: { label:{en:'Template: Select Table'}, type:'Text', defaultValue:'Wybierz tabelę', bindable:true },
        labelAddTemplate: { label:{en:'Template: Add'}, type:'Text', defaultValue:'Dodaj szablon', bindable:true },
        labelNoTemplates: { label:{en:'Template: None'}, type:'Text', defaultValue:'Brak szablonów', bindable:true },
        labelRolesHint: { label:{en:'Roles: Hint'}, type:'Text', defaultValue:'Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.', bindable:true },
        labelUsersCount: { label:{en:'Roles: Users Count'}, type:'Text', defaultValue:'użytk.', bindable:true },

        // === PERMISSIONS EDITING ===
        labelEditPermsFor: { label:{en:'Perms: Edit For'}, type:'Text', defaultValue:'Edycja uprawnień —', bindable:true },
        labelEditPermsHint: { label:{en:'Perms: Edit Hint'}, type:'Text', defaultValue:'Ręczna zmiana uprawnień nadpisuje automatyczne uprawnienia z ról.', bindable:true },
        labelAddPermission: { label:{en:'Perms: Add'}, type:'Text', defaultValue:'Dodaj uprawnienie', bindable:true },

        // === AUDIT ===
        labelAuditAllTables: { label:{en:'Audit: All Tables'}, type:'Text', defaultValue:'Wszystkie', bindable:true },
        labelAuditEmailPlaceholder: { label:{en:'Audit: Email'}, type:'Text', defaultValue:'Wyszukaj Email...', bindable:true },
        labelNoAuditEntries: { label:{en:'Audit: No Entries'}, type:'Text', defaultValue:'Brak wpisów', bindable:true },

        // === TEMP GRANTS ===
        labelNoTempGrants: { label:{en:'Temp: No Grants'}, type:'Text', defaultValue:'Brak aktywnych tymczasowych uprawnień', bindable:true },

        // === CONFIRM ===
        labelConfirmDeleteRole: { label:{en:'Confirm: Delete Role'}, type:'Text', defaultValue:'Usunąć rolę "{role}"? To usunie ją od wszystkich użytkowników.', bindable:true },
        labelConfirmDeleteRoleTitle: { label:{en:'Confirm: Delete Role Title'}, type:'Text', defaultValue:'Usunięcie roli', bindable:true },
        labelConfirmRemoveRole: { label:{en:'Confirm: Remove Role'}, type:'Text', defaultValue:'Usunąć rolę "{role}" użytkownikowi {user}?', bindable:true },
        labelConfirmRemoveRoleTitle: { label:{en:'Confirm: Remove Role Title'}, type:'Text', defaultValue:'Usunięcie roli użytkownikowi', bindable:true },
        labelConfirmRevoke: { label:{en:'Confirm: Revoke Grant'}, type:'Text', defaultValue:'Cofnąć tymczasowy dostęp?', bindable:true },
        labelConfirmRevokeTitle: { label:{en:'Confirm: Revoke Title'}, type:'Text', defaultValue:'Cofnięcie tymczasowego dostępu', bindable:true },
    }
};
