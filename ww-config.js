export default {
    editor: {
        label: { en: 'Admin Panel', pl: 'Panel administracyjny' },
        icon: 'settings',
        customStylePropertiesOrder: [
            // --- THEME ---
            ['theme'],

            // --- CONNECTION ---
            ['supabaseUrl', 'supabaseAnonKey'],

            // --- SIDEBAR ---
            ['showSidebar', 'sidebarTopOffset', 'sidebarZIndex'],

            // --- CHART ---
            ['chartBg', 'chartBorder', 'chartLineColor', 'chartDotColor', 'chartDotSize', 'chartGridColor', 'chartLabelColor', 'chartHeight', 'chartAreaOpacity'],

            // --- STAT CARD COLORS ---
            ['statManagersColor', 'statClientsColor', 'statVacationColor', 'statPendingColor', 'statChangesColor', 'statTempColor', 'statRolesColor', 'statDeptsColor'],

            // --- STATUS ---
            ['statusActiveColor', 'statusInactiveColor', 'statusTerminatedColor', 'statusVacationColor'],
            ['statusActiveTextColor', 'statusInactiveTextColor', 'statusTerminatedTextColor', 'statusVacationTextColor'],

            // --- TEMP ACCESS ---
            ['tempIndicatorColor', 'tempRoleBorder'],
            ['tempBadgeBg', 'tempBadgeText', 'tempUrgentBg', 'tempUrgentText'],

            // --- DEPARTMENTS TEMP ---
            ['odzTempBorder', 'odzTempBg', 'odzTempText', 'odzTempIndicator', 'odzIndicatorOn', 'odzIndicatorOff'],

            // --- CHANGES ---
            ['changePositiveColor', 'changeNegativeColor'],
            ['diffPositiveColor', 'diffNegativeColor', 'diffNeutralColor'],

            // --- ROLE COLORS ---
            ['labelRoleColor'],

            // --- ICONS ---
            ['iconNavDashboard', 'iconNavUsers', 'iconNavRoles', 'iconNavAudit', 'iconNavTemp', 'iconNavMatrix', 'iconNavRequests', 'navIconSize', 'navIconColor'],
            ['iconSetup', 'iconTempIndicator', 'iconClose', 'iconEdit', 'iconDelete', 'iconCheckmark', 'iconSize'],

            // --- STAT CARDS CONFIG ---
            ['labelStatManagers', 'labelStatClients', 'labelStatVacation', 'labelStatPending', 'labelStatChanges', 'labelStatTempGrants', 'labelStatRolesCount', 'labelStatDepts'],
            ['showStatManagers', 'showStatClients', 'showStatVacation', 'showStatPending', 'showStatChanges', 'showStatTempGrants', 'showStatRolesCount', 'showStatDepts'],
            ['orderStatManagers', 'orderStatClients', 'orderStatVacation', 'orderStatPending', 'orderStatChanges', 'orderStatTempGrants', 'orderStatRolesCount', 'orderStatDepts'],

            // --- LABELS: NAV ---
            ['labelSidebarTitle', 'labelSidebarSubtitle'],
            ['labelDashboard', 'labelUsers', 'labelRoles', 'labelAudit', 'labelTemp', 'labelMatrix', 'labelRequests'],

            // --- LABELS: DASHBOARD ---
            ['labelRolesDistribution', 'labelDepartments', 'labelClientsChart', 'labelDiffPeriod'],

            // --- LABELS: TABLE ---
            ['labelColUser', 'labelColRoles', 'labelColDepts', 'labelColClients', 'labelColStatus'],
            ['labelStatusActive', 'labelStatusInactive', 'labelStatusTerminated', 'labelStatusVacation'],
            ['labelSearch', 'labelAllRoles', 'labelAllStatuses', 'labelAllDepts', 'labelNoResults', 'labelSuperAdmin', 'labelVacation', 'labelPrev', 'labelNext'],
            ['labelEmptyUsers', 'labelEmptyAudit', 'labelEmptyTemp', 'labelEmptyRoles'],

            // --- LABELS: BUTTONS ---
            ['labelBtnCopy', 'labelBtnAddRole', 'labelBtnTempAccess', 'labelBtnNewRole', 'labelBtnEditRole', 'labelBtnEditPerms', 'labelBtnApply', 'labelBtnApplyModified'],
            ['labelBtnExtend', 'labelBtnRevoke', 'labelBtnExport'],
            ['labelBulkSelected', 'labelBulkAddRole', 'labelBulkAddDept'],
            ['labelSave', 'labelCreate', 'labelCancel', 'labelConfirm'],

            // --- LABELS: DETAIL ---
            ['labelTabRoles', 'labelTabVisibility', 'labelTabDepts', 'labelTabHistory'],
            ['labelAssignedRoles', 'labelPermissions', 'labelVisibleClients', 'labelAutoFromRoles', 'labelNoRoles', 'labelSuperAdminAccess', 'labelNoPermissions'],
            ['labelUserDepts', 'labelAllDeptsAccess', 'labelDept', 'labelAllRolesAssigned'],
            ['labelHistory', 'labelGrantedBy', 'labelGrantedAt', 'labelExpiresAt'],

            // --- LABELS: MODALS ---
            ['labelAddRoleFor', 'labelCopyFrom', 'labelSelectTarget', 'labelReviewCopy', 'labelChangeTarget', 'labelChanged', 'labelSummary', 'labelTarget', 'labelNone', 'labelOf', 'labelSelectAll', 'labelClearAll'],
            ['labelTempAccessFor', 'labelTempType', 'labelTempRole', 'labelTempDept', 'labelTempExpires', 'labelTempReason', 'labelTempReasonPlaceholder', 'labelTempApply'],
            ['labelSelectRole', 'labelSelectDepts'],
            ['labelExtendAccess', 'labelNewExpiry', 'labelExtendReason', 'labelExtendReasonPlaceholder'],
            ['labelNewRole', 'labelRoleNamePlaceholder', 'labelEditRole', 'labelTemplates', 'labelSelectTable', 'labelAddTemplate', 'labelNoTemplates'],
            ['labelRolesHint', 'labelUsersCount', 'labelLegendSelect', 'labelLegendInsert', 'labelLegendUpdate', 'labelLegendDelete', 'labelLegendAll'],
            ['labelEditPermsFor', 'labelEditPermsHint', 'labelAddPermission'],
            ['labelContrastWarning'],

            // --- LABELS: AUDIT ---
            ['labelAuditAllTables', 'labelAuditEmailPlaceholder', 'labelNoAuditEntries', 'labelAuditSelectUsers', 'labelAuditShowing'],
            ['labelToday', 'labelDays'],

            // --- LABELS: TEMP & CONFIRM ---
            ['labelNoTempGrants'],
            ['labelConfirmDeleteRole', 'labelConfirmDeleteRoleTitle', 'labelConfirmRemoveRole', 'labelConfirmRemoveRoleTitle', 'labelConfirmRevoke', 'labelConfirmRevokeTitle']
        ]
    },
    properties: {
        // === THEME ===
        theme: { label:{en:'Theme', pl:'Motyw'}, type:'TextSelect', options:{options:[{value:'dark',label:{en:'Dark',pl:'Ciemny'}},{value:'light',label:{en:'Light',pl:'Jasny'}}]}, defaultValue:'dark', bindable:true, responsive:true },

        // === CONNECTION ===
        supabaseUrl: { label:{en:'Supabase URL'}, type:'Text', defaultValue:'', bindable:true, section:'settings' },
        supabaseAnonKey: { label:{en:'Supabase Anon Key'}, type:'Text', defaultValue:'', bindable:true, section:'settings' },

        // === SIDEBAR ===
        showSidebar: { label:{en:'Show Sidebar'}, type:'OnOff', defaultValue:true, bindable:true, responsive:true },
        sidebarTopOffset: { label:{en:'Sidebar Top Offset', pl:'Offset górny sidebara'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:200}]}, defaultValue:'0px', bindable:true, responsive:true },
        sidebarZIndex: { label:{en:'Sidebar Z-Index'}, type:'Number', options:{min:0,max:9999,step:1}, defaultValue:0, bindable:true },
        labelSidebarTitle: { label:{en:'Sidebar Title'}, type:'Text', defaultValue:'', bindable:true },
        labelSidebarSubtitle: { label:{en:'Sidebar Subtitle'}, type:'Text', defaultValue:'', bindable:true },

        // === STATUS DOTS ===
        statusActiveColor: { label:{en:'Active Dot'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statusInactiveColor: { label:{en:'Inactive Dot'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statusTerminatedColor: { label:{en:'Terminated Dot'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statusVacationColor: { label:{en:'Vacation Dot'}, type:'Color', defaultValue:'#4B8765', bindable:true },
        statusActiveTextColor: { label:{en:'Active Text'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statusInactiveTextColor: { label:{en:'Inactive Text'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statusTerminatedTextColor: { label:{en:'Terminated Text'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statusVacationTextColor: { label:{en:'Vacation Text'}, type:'Color', defaultValue:'#4B8765', bindable:true },

        // === DEPARTMENT TEMP INDICATORS ===
        odzTempBorder: { label:{en:'Dept Temp Border', pl:'Oddział tymczasowy: ramka'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        odzTempBg: { label:{en:'Dept Temp BG', pl:'Oddział tymczasowy: tło'}, type:'Color', defaultValue:'rgba(245,158,11,0.1)', bindable:true },
        odzTempText: { label:{en:'Dept Temp Text', pl:'Oddział tymczasowy: tekst'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        odzIndicatorOn: { label:{en:'Dept Indicator On', pl:'Wskaźnik oddziału: aktywny'}, type:'Color', defaultValue:'#4B8765', bindable:true },
        odzIndicatorOff: { label:{en:'Dept Indicator Off', pl:'Wskaźnik oddziału: nieaktywny'}, type:'Color', defaultValue:'#333333', bindable:true },
        odzTempIndicator: { label:{en:'Dept Temp Indicator', pl:'Oddział tymczasowy: wskaźnik'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        tempIndicatorColor: { label:{en:'Temp Icon Color', pl:'Kolor ikony tymczasowej'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        tempRoleBorder: { label:{en:'Temp Role Border', pl:'Tymczasowa rola: ramka'}, type:'Color', defaultValue:'#f59e0b', bindable:true },

        // === ROLE BADGE COLORS ===
        labelRoleColor: { label:{en:'Role editor: Color section label', pl:'Kolor roli'}, type:'Text', defaultValue:'Kolor roli', bindable:true },

        // === TEMP BADGE COLORS ===
        tempBadgeBg: { label:{en:'Temp Badge BG', pl:'Tło odznaki tymczasowego dostępu'}, type:'Color', defaultValue:'rgba(245,158,11,0.12)', bindable:true, responsive:true },
        tempBadgeText: { label:{en:'Temp Badge Text', pl:'Tekst odznaki tymczasowego dostępu'}, type:'Color', defaultValue:'#f59e0b', bindable:true, responsive:true },
        tempUrgentBg: { label:{en:'Temp Urgent BG', pl:'Tło odznaki wygasającego dostępu'}, type:'Color', defaultValue:'rgba(239,68,68,0.12)', bindable:true, responsive:true },
        tempUrgentText: { label:{en:'Temp Urgent Text', pl:'Tekst odznaki wygasającego dostępu'}, type:'Color', defaultValue:'#ef4444', bindable:true, responsive:true },

        // === CHANGE / DIFF INDICATORS ===
        changePositiveColor: { label:{en:'Positive change (green)',pl:'Zmiana pozytywna (zielony)'}, type:'Color', defaultValue:'#22c55e', bindable:true, responsive:true },
        changeNegativeColor: { label:{en:'Negative change (red)',pl:'Zmiana negatywna (czerwony)'}, type:'Color', defaultValue:'#ef4444', bindable:true, responsive:true },
        diffPositiveColor: { label:{en:'Diff Positive', pl:'Różnica: wzrost'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        diffNegativeColor: { label:{en:'Diff Negative', pl:'Różnica: spadek'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        diffNeutralColor: { label:{en:'Diff Neutral', pl:'Różnica: bez zmian'}, type:'Color', defaultValue:'#8a8880', bindable:true },

        // === CHART ===
        chartBg: { label:{en:'Chart BG'}, type:'Color', defaultValue:'transparent', bindable:true },
        chartBorder: { label:{en:'Chart Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true },
        chartLineColor: { label:{en:'Chart Line Color'}, type:'Color', defaultValue:'#4B8765', bindable:true },
        chartDotColor: { label:{en:'Chart Dot Color'}, type:'Color', defaultValue:'#6BAA85', bindable:true },
        chartDotSize: { label:{en:'Chart Dot Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:2,max:8}]}, defaultValue:'4px', bindable:true },
        chartGridColor: { label:{en:'Chart Grid Color'}, type:'Color', defaultValue:'rgba(255,255,255,0.05)', bindable:true },
        chartLabelColor: { label:{en:'Chart Label Color'}, type:'Color', defaultValue:'#8a8880', bindable:true },
        chartHeight: { label:{en:'Chart Height'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:100,max:500}]}, defaultValue:'200px', bindable:true, responsive:true },
        chartAreaOpacity: { label:{en:'Chart Area Opacity'}, type:'Number', options:{min:0,max:1,step:0.05}, defaultValue:0.15, bindable:true },

        // === STAT CARD ACCENT COLORS ===
        statManagersColor: { label:{en:'Stat color: Managers', pl:'Kolor paska: Menedżerowie'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statClientsColor: { label:{en:'Stat color: Clients', pl:'Kolor paska: Klienci'}, type:'Color', defaultValue:'#4B8765', bindable:true },
        statVacationColor: { label:{en:'Stat color: Vacation', pl:'Kolor paska: Urlopy'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statPendingColor: { label:{en:'Stat color: Pending', pl:'Kolor paska: Oczekujące'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statChangesColor: { label:{en:'Stat color: Changes', pl:'Kolor paska: Zmiany'}, type:'Color', defaultValue:'#8b5cf6', bindable:true },
        statTempColor: { label:{en:'Stat color: Temp Grants', pl:'Kolor paska: Tymczasowe'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        statRolesColor: { label:{en:'Stat color: Roles', pl:'Kolor paska: Role'}, type:'Color', defaultValue:'#4B8765', bindable:true },
        statDeptsColor: { label:{en:'Stat color: Departments', pl:'Kolor paska: Oddziały'}, type:'Color', defaultValue:'#0ea5e9', bindable:true },

        // === ICONS — NAV ===
        iconNavDashboard: { label:{en:'Icon: Dashboard nav', pl:'Ikona: Dashboard'}, type:'SystemIcon', bindable:true },
        iconNavUsers: { label:{en:'Icon: Users nav', pl:'Ikona: Użytkownicy'}, type:'SystemIcon', bindable:true },
        iconNavRoles: { label:{en:'Icon: Roles nav', pl:'Ikona: Role'}, type:'SystemIcon', bindable:true },
        iconNavAudit: { label:{en:'Icon: Audit nav', pl:'Ikona: Audyt'}, type:'SystemIcon', bindable:true },
        iconNavTemp: { label:{en:'Icon: Temporary nav', pl:'Ikona: Tymczasowe'}, type:'SystemIcon', bindable:true },
        iconNavMatrix: { label:{en:'Icon: Matrix nav', pl:'Ikona: Matryca'}, type:'SystemIcon', bindable:true },
        iconNavRequests: { label:{en:'Icon: Requests nav', pl:'Ikona: Wnioski'}, type:'SystemIcon', bindable:true },
        navIconSize: { label:{en:'Nav Icon Size', pl:'Rozmiar ikony nawigacji'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:40}]}, defaultValue:'18px', bindable:true, responsive:true },
        navIconColor: { label:{en:'Nav Icon Color', pl:'Kolor ikony nawigacji'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },

        // === ICONS — GENERAL ===
        iconSetup: { label:{en:'Icon: Setup/loading screen', pl:'Ikona: Ekran ładowania'}, type:'SystemIcon', bindable:true },
        iconTempIndicator: { label:{en:'Icon: Temp access indicator', pl:'Ikona: Wskaźnik tymczasowego dostępu'}, type:'SystemIcon', bindable:true },
        iconClose: { label:{en:'Icon: Close/dismiss', pl:'Ikona: Zamknij'}, type:'SystemIcon', bindable:true },
        iconEdit: { label:{en:'Icon: Edit', pl:'Ikona: Edytuj'}, type:'SystemIcon', bindable:true },
        iconDelete: { label:{en:'Icon: Delete', pl:'Ikona: Usuń'}, type:'SystemIcon', bindable:true },
        iconCheckmark: { label:{en:'Icon: Checkmark', pl:'Ikona: Zaznaczenie'}, type:'SystemIcon', bindable:true },
        iconSize: { label:{en:'General Icon Size', pl:'Rozmiar ikon ogólnych'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:8,max:32}]}, defaultValue:'14px', bindable:true, responsive:true },

        // === STAT CARD LABELS ===
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
        orderStatManagers: { label:{en:'Order: Managers (1-8)', pl:'Kolejność: Menedżerowie'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:1, bindable:true },
        orderStatClients: { label:{en:'Order: Clients', pl:'Kolejność: Klienci'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:2, bindable:true },
        orderStatVacation: { label:{en:'Order: Vacation', pl:'Kolejność: Urlopy'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:3, bindable:true },
        orderStatPending: { label:{en:'Order: Pending', pl:'Kolejność: Oczekujące'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:4, bindable:true },
        orderStatChanges: { label:{en:'Order: Changes', pl:'Kolejność: Zmiany'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:5, bindable:true },
        orderStatTempGrants: { label:{en:'Order: Temp Grants', pl:'Kolejność: Tymczasowe'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:6, bindable:true },
        orderStatRolesCount: { label:{en:'Order: Roles Count', pl:'Kolejność: Role'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:7, bindable:true },
        orderStatDepts: { label:{en:'Order: Departments', pl:'Kolejność: Oddziały'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:8, bindable:true },

        // === NAV LABELS ===
        labelDashboard: { label:{en:'Nav: Dashboard tab', pl:'Zakładka Dashboard'}, type:'Text', defaultValue:'Dashboard', bindable:true },
        labelUsers: { label:{en:'Nav: Users tab', pl:'Zakładka Użytkownicy'}, type:'Text', defaultValue:'Użytkownicy', bindable:true },
        labelRoles: { label:{en:'Nav: Roles tab', pl:'Zakładka Role'}, type:'Text', defaultValue:'Role', bindable:true },
        labelAudit: { label:{en:'Nav: Audit tab', pl:'Zakładka Audyt'}, type:'Text', defaultValue:'Audyt', bindable:true },
        labelTemp: { label:{en:'Nav: Temporary tab', pl:'Zakładka Tymczasowe'}, type:'Text', defaultValue:'Tymczasowe', bindable:true },
        labelMatrix: { label:{en:'Matrix page title', pl:'Tytuł: Matryca'}, type:'Text', defaultValue:'', bindable:true },
        labelRequests: { label:{en:'Requests page title', pl:'Tytuł: Wnioski'}, type:'Text', defaultValue:'', bindable:true },

        // === DASHBOARD LABELS ===
        labelRolesDistribution: { label:{en:'Section: Roles Distribution'}, type:'Text', defaultValue:'Rozkład ról', bindable:true },
        labelDepartments: { label:{en:'Section: Departments'}, type:'Text', defaultValue:'Oddziały', bindable:true },
        labelClientsChart: { label:{en:'Section: Clients Chart'}, type:'Text', defaultValue:'Aktywni klienci — wykres', bindable:true },
        labelDiffPeriod: { label:{en:'Label: Diff period hint'}, type:'Text', defaultValue:'różnica 30 dni', bindable:true },

        // === TABLE LABELS ===
        labelColUser: { label:{en:'Col: User', pl:'Nagłówek: Użytkownik'}, type:'Text', defaultValue:'UŻYTKOWNIK', bindable:true },
        labelColRoles: { label:{en:'Col: Roles', pl:'Nagłówek: Role'}, type:'Text', defaultValue:'ROLE', bindable:true },
        labelColDepts: { label:{en:'Col: Depts', pl:'Nagłówek: Oddziały'}, type:'Text', defaultValue:'ODDZIAŁY', bindable:true },
        labelColClients: { label:{en:'Col: Clients', pl:'Nagłówek: Klienci'}, type:'Text', defaultValue:'KLIENCI', bindable:true },
        labelColStatus: { label:{en:'Col: Status', pl:'Nagłówek: Status'}, type:'Text', defaultValue:'STATUS', bindable:true },
        labelStatusActive: { label:{en:'Status: Active', pl:'Status: Aktywny'}, type:'Text', defaultValue:'Aktywny', bindable:true },
        labelStatusInactive: { label:{en:'Status: Inactive', pl:'Status: Nieaktywny'}, type:'Text', defaultValue:'Nieaktywny', bindable:true },
        labelStatusTerminated: { label:{en:'Status: Terminated', pl:'Status: Zwolniony'}, type:'Text', defaultValue:'Zwolniony', bindable:true },
        labelStatusVacation: { label:{en:'Status: Vacation', pl:'Status: Urlop'}, type:'Text', defaultValue:'Urlop', bindable:true },
        labelSearch: { label:{en:'Search placeholder', pl:'Placeholder wyszukiwania'}, type:'Text', defaultValue:'Szukaj po nazwisku lub email...', bindable:true },
        labelAllRoles: { label:{en:'All Roles filter', pl:'Filtr: Wszystkie role'}, type:'Text', defaultValue:'Wszystkie role', bindable:true },
        labelAllStatuses: { label:{en:'All Statuses filter', pl:'Filtr: Wszystkie statusy'}, type:'Text', defaultValue:'', bindable:true },
        labelAllDepts: { label:{en:'All Departments filter', pl:'Filtr: Wszystkie oddziały'}, type:'Text', defaultValue:'', bindable:true },
        labelNoResults: { label:{en:'No results', pl:'Brak wyników'}, type:'Text', defaultValue:'Brak wyników', bindable:true },
        labelSuperAdmin: { label:{en:'SuperAdmin badge', pl:'Odznaka: SuperAdmin'}, type:'Text', defaultValue:'SuperAdmin', bindable:true },
        labelVacation: { label:{en:'Vacation badge', pl:'Odznaka: Urlop'}, type:'Text', defaultValue:'URLOP', bindable:true },
        labelPrev: { label:{en:'Pagination: Prev', pl:'Paginacja: Wstecz'}, type:'Text', defaultValue:'Wstecz', bindable:true },
        labelNext: { label:{en:'Pagination: Next', pl:'Paginacja: Dalej'}, type:'Text', defaultValue:'Dalej', bindable:true },
        labelEmptyUsers: { label:{en:'Empty: Users', pl:'Pusty: Użytkownicy'}, type:'Text', defaultValue:'', bindable:true },
        labelEmptyAudit: { label:{en:'Empty: Audit', pl:'Pusty: Audyt'}, type:'Text', defaultValue:'', bindable:true },
        labelEmptyTemp: { label:{en:'Empty: Temp grants', pl:'Pusty: Tymczasowe'}, type:'Text', defaultValue:'', bindable:true },
        labelEmptyRoles: { label:{en:'Empty: Roles', pl:'Pusty: Role'}, type:'Text', defaultValue:'', bindable:true },

        // === BUTTON LABELS ===
        labelBtnCopy: { label:{en:'Btn: Copy permissions', pl:'Przycisk: Kopiuj uprawnienia'}, type:'Text', defaultValue:'Kopiuj uprawnienia na...', bindable:true },
        labelBtnAddRole: { label:{en:'Btn: Add role', pl:'Przycisk: Dodaj rolę'}, type:'Text', defaultValue:'+ Dodaj rolę', bindable:true },
        labelBtnTempAccess: { label:{en:'Btn: Temp access', pl:'Przycisk: Tymczasowy dostęp'}, type:'Text', defaultValue:'⏱ Tymczasowy dostęp', bindable:true },
        labelBtnNewRole: { label:{en:'Btn: New role', pl:'Przycisk: Nowa rola'}, type:'Text', defaultValue:'+ Nowa rola', bindable:true },
        labelBtnEditRole: { label:{en:'Btn: Edit role', pl:'Przycisk: Edytuj rolę'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnEditPerms: { label:{en:'Btn: Edit permissions', pl:'Przycisk: Edytuj uprawnienia'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnApply: { label:{en:'Btn: Apply copy', pl:'Przycisk: Zastosuj kopię'}, type:'Text', defaultValue:'Zastosuj kopię', bindable:true },
        labelBtnApplyModified: { label:{en:'Btn: Apply modified', pl:'Przycisk: Zastosuj ze zmianami'}, type:'Text', defaultValue:'Zastosuj ze zmianami', bindable:true },
        labelBtnExtend: { label:{en:'Btn: Edit temp', pl:'Przycisk: Edytuj tymcz.'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnRevoke: { label:{en:'Btn: Revoke', pl:'Przycisk: Cofnij'}, type:'Text', defaultValue:'Cofnij', bindable:true },
        labelBtnExport: { label:{en:'Export button', pl:'Przycisk: Eksport'}, type:'Text', defaultValue:'', bindable:true },
        labelBulkSelected: { label:{en:'Bulk: Selected', pl:'Zaznaczono'}, type:'Text', defaultValue:'', bindable:true },
        labelBulkAddRole: { label:{en:'Bulk: Add role', pl:'Dodaj rolę wszystkim'}, type:'Text', defaultValue:'', bindable:true },
        labelBulkAddDept: { label:{en:'Bulk: Add dept', pl:'Dodaj oddział wszystkim'}, type:'Text', defaultValue:'', bindable:true },
        labelSave: { label:{en:'Btn: Save', pl:'Zapisz'}, type:'Text', defaultValue:'Zapisz', bindable:true },
        labelCreate: { label:{en:'Btn: Create', pl:'Utwórz'}, type:'Text', defaultValue:'Utwórz', bindable:true },
        labelCancel: { label:{en:'Btn: Cancel', pl:'Anuluj'}, type:'Text', defaultValue:'Anuluj', bindable:true },
        labelConfirm: { label:{en:'Btn: Confirm', pl:'Potwierdź'}, type:'Text', defaultValue:'Potwierdź', bindable:true },

        // === DETAIL PANEL ===
        labelTabRoles: { label:{en:'Tab: Roles', pl:'Zakładka: Role i uprawnienia'}, type:'Text', defaultValue:'Role i uprawnienia', bindable:true },
        labelTabVisibility: { label:{en:'Tab: Visibility', pl:'Zakładka: Widoczność klientów'}, type:'Text', defaultValue:'Widoczność klientów', bindable:true },
        labelTabDepts: { label:{en:'Tab: Departments', pl:'Zakładka: Oddziały'}, type:'Text', defaultValue:'Oddziały', bindable:true },
        labelTabHistory: { label:{en:'Tab: History', pl:'Zakładka: Historia'}, type:'Text', defaultValue:'', bindable:true },
        labelAssignedRoles: { label:{en:'Assigned roles header', pl:'Przypisane role'}, type:'Text', defaultValue:'Przypisane role', bindable:true },
        labelPermissions: { label:{en:'Permissions header', pl:'Uprawnienia'}, type:'Text', defaultValue:'Uprawnienia', bindable:true },
        labelVisibleClients: { label:{en:'Visible clients', pl:'widocznych klientów'}, type:'Text', defaultValue:'widocznych klientów', bindable:true },
        labelAutoFromRoles: { label:{en:'Auto from roles', pl:'auto z ról'}, type:'Text', defaultValue:'auto z ról', bindable:true },
        labelNoRoles: { label:{en:'No roles', pl:'Brak ról'}, type:'Text', defaultValue:'Brak ról', bindable:true },
        labelSuperAdminAccess: { label:{en:'SA full access', pl:'Super admin — pełny dostęp'}, type:'Text', defaultValue:'Super admin — pełny dostęp', bindable:true },
        labelNoPermissions: { label:{en:'No permissions', pl:'Brak uprawnień'}, type:'Text', defaultValue:'Brak uprawnień', bindable:true },
        labelUserDepts: { label:{en:'User departments', pl:'Dostępne oddziały'}, type:'Text', defaultValue:'Dostępne oddziały', bindable:true },
        labelAllDeptsAccess: { label:{en:'Full dept access', pl:'Pełny dostęp — wszystkie oddziały'}, type:'Text', defaultValue:'Pełny dostęp — wszystkie oddziały', bindable:true },
        labelDept: { label:{en:'Department', pl:'Oddział'}, type:'Text', defaultValue:'Oddział', bindable:true },
        labelAllRolesAssigned: { label:{en:'All roles assigned', pl:'Wszystkie role przypisane'}, type:'Text', defaultValue:'Wszystkie role przypisane', bindable:true },
        labelHistory: { label:{en:'History tab', pl:'Historia'}, type:'Text', defaultValue:'', bindable:true },
        labelGrantedBy: { label:{en:'Granted by', pl:'Nadane przez'}, type:'Text', defaultValue:'Nadane przez', bindable:true },
        labelGrantedAt: { label:{en:'Granted at', pl:'Nadano'}, type:'Text', defaultValue:'Nadano', bindable:true },
        labelExpiresAt: { label:{en:'Expires at', pl:'Wygasa'}, type:'Text', defaultValue:'Wygasa', bindable:true },

        // === COPY MODAL ===
        labelAddRoleFor: { label:{en:'Add role for...', pl:'Dodaj rolę —'}, type:'Text', defaultValue:'Dodaj rolę —', bindable:true },
        labelCopyFrom: { label:{en:'Copy from', pl:'Kopiuj z'}, type:'Text', defaultValue:'Kopiuj z', bindable:true },
        labelSelectTarget: { label:{en:'Select target', pl:'Wybierz cel'}, type:'Text', defaultValue:'Wybierz cel', bindable:true },
        labelReviewCopy: { label:{en:'Review copy', pl:'Sprawdź i dostosuj'}, type:'Text', defaultValue:'Sprawdź i dostosuj', bindable:true },
        labelChangeTarget: { label:{en:'Change target', pl:'Zmień cel'}, type:'Text', defaultValue:'Zmień cel', bindable:true },
        labelChanged: { label:{en:'Changed badge', pl:'zmienione'}, type:'Text', defaultValue:'zmienione', bindable:true },
        labelSummary: { label:{en:'Summary', pl:'Podsumowanie'}, type:'Text', defaultValue:'Podsumowanie', bindable:true },
        labelTarget: { label:{en:'Target', pl:'Cel'}, type:'Text', defaultValue:'Cel', bindable:true },
        labelNone: { label:{en:'None', pl:'brak'}, type:'Text', defaultValue:'brak', bindable:true },
        labelOf: { label:{en:'Of (X of Y)', pl:'z (X z Y)'}, type:'Text', defaultValue:'z', bindable:true },
        labelSelectAll: { label:{en:'Select all', pl:'Zaznacz wszystkie'}, type:'Text', defaultValue:'Zaznacz wszystkie', bindable:true },
        labelClearAll: { label:{en:'Clear all', pl:'Wyczyść'}, type:'Text', defaultValue:'Wyczyść', bindable:true },

        // === TEMP GRANT MODAL ===
        labelTempAccessFor: { label:{en:'Temp access for...', pl:'Tymczasowy dostęp —'}, type:'Text', defaultValue:'Tymczasowy dostęp —', bindable:true },
        labelTempType: { label:{en:'Type', pl:'Typ'}, type:'Text', defaultValue:'Typ', bindable:true },
        labelTempRole: { label:{en:'Role toggle', pl:'Rola'}, type:'Text', defaultValue:'Rola', bindable:true },
        labelTempDept: { label:{en:'Dept toggle', pl:'Oddział'}, type:'Text', defaultValue:'Oddział', bindable:true },
        labelTempExpires: { label:{en:'Expires', pl:'Wygasa (czas polski)'}, type:'Text', defaultValue:'Wygasa (czas polski)', bindable:true },
        labelTempReason: { label:{en:'Reason', pl:'Powód (opcjonalnie)'}, type:'Text', defaultValue:'Powód (opcjonalnie)', bindable:true },
        labelTempReasonPlaceholder: { label:{en:'Reason placeholder', pl:'np. zastępstwo za...'}, type:'Text', defaultValue:'np. zastępstwo za...', bindable:true },
        labelTempApply: { label:{en:'Apply temp access', pl:'Nadaj tymczasowy dostęp'}, type:'Text', defaultValue:'Nadaj tymczasowy dostęp', bindable:true },
        labelSelectRole: { label:{en:'Select role', pl:'Wybierz rolę'}, type:'Text', defaultValue:'Wybierz rolę', bindable:true },
        labelSelectDepts: { label:{en:'Select depts', pl:'Wybierz oddziały'}, type:'Text', defaultValue:'Wybierz oddziały', bindable:true },

        // === EXTEND / OTHER MODALS ===
        labelExtendAccess: { label:{en:'Extend access', pl:'Przedłuż dostęp'}, type:'Text', defaultValue:'Przedłuż dostęp', bindable:true },
        labelNewExpiry: { label:{en:'New expiry', pl:'Nowa data wygaśnięcia'}, type:'Text', defaultValue:'Nowa data wygaśnięcia', bindable:true },
        labelExtendReason: { label:{en:'Extend reason', pl:'Powód przedłużenia'}, type:'Text', defaultValue:'', bindable:true },
        labelExtendReasonPlaceholder: { label:{en:'Extend reason placeholder', pl:'np. kontynuacja zastępstwa...'}, type:'Text', defaultValue:'', bindable:true },

        // === ROLE EDITING ===
        labelNewRole: { label:{en:'New role', pl:'Nowa rola'}, type:'Text', defaultValue:'Nowa rola', bindable:true },
        labelRoleNamePlaceholder: { label:{en:'Role name placeholder', pl:'Nazwa roli...'}, type:'Text', defaultValue:'Nazwa roli...', bindable:true },
        labelEditRole: { label:{en:'Edit role', pl:'Edycja roli'}, type:'Text', defaultValue:'Edycja roli', bindable:true },
        labelTemplates: { label:{en:'Templates', pl:'Szablony uprawnień'}, type:'Text', defaultValue:'Szablony uprawnień', bindable:true },
        labelSelectTable: { label:{en:'Select table', pl:'Wybierz tabelę'}, type:'Text', defaultValue:'Wybierz tabelę', bindable:true },
        labelAddTemplate: { label:{en:'Add template', pl:'Dodaj szablon'}, type:'Text', defaultValue:'Dodaj szablon', bindable:true },
        labelNoTemplates: { label:{en:'No templates', pl:'Brak szablonów'}, type:'Text', defaultValue:'Brak szablonów', bindable:true },
        labelRolesHint: { label:{en:'Roles hint', pl:'Podpowiedź na stronie ról'}, type:'Text', defaultValue:'Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.', bindable:true },
        labelUsersCount: { label:{en:'Users count suffix', pl:'użytk.'}, type:'Text', defaultValue:'użytk.', bindable:true },
        labelLegendSelect: { label:{en:'Legend: SELECT', pl:'Legenda: SELECT'}, type:'Text', defaultValue:'Odczyt danych z tabeli', bindable:true },
        labelLegendInsert: { label:{en:'Legend: INSERT', pl:'Legenda: INSERT'}, type:'Text', defaultValue:'Dodawanie nowych rekordów', bindable:true },
        labelLegendUpdate: { label:{en:'Legend: UPDATE', pl:'Legenda: UPDATE'}, type:'Text', defaultValue:'Edycja istniejących rekordów', bindable:true },
        labelLegendDelete: { label:{en:'Legend: DELETE', pl:'Legenda: DELETE'}, type:'Text', defaultValue:'Usuwanie rekordów', bindable:true },
        labelLegendAll: { label:{en:'Legend: ALL', pl:'Legenda: ALL'}, type:'Text', defaultValue:'Pełny dostęp (wszystkie operacje)', bindable:true },

        // === PERMISSIONS EDITING ===
        labelEditPermsFor: { label:{en:'Edit perms for', pl:'Edycja uprawnień —'}, type:'Text', defaultValue:'Edycja uprawnień —', bindable:true },
        labelEditPermsHint: { label:{en:'Edit perms hint', pl:'Podpowiedź edycji uprawnień'}, type:'Text', defaultValue:'Ręczna zmiana uprawnień nadpisuje automatyczne uprawnienia z ról.', bindable:true },
        labelAddPermission: { label:{en:'Add permission', pl:'Dodaj uprawnienie'}, type:'Text', defaultValue:'Dodaj uprawnienie', bindable:true },
        labelContrastWarning: { label:{en:'Contrast warning', pl:'Ostrzeżenie o kontraście'}, type:'Text', defaultValue:'', bindable:true },

        // === AUDIT ===
        labelAuditAllTables: { label:{en:'Audit: All tables', pl:'Filtr: Wszystkie'}, type:'Text', defaultValue:'Wszystkie', bindable:true },
        labelAuditEmailPlaceholder: { label:{en:'Audit: Email placeholder', pl:'Wyszukaj Email...'}, type:'Text', defaultValue:'Wyszukaj Email...', bindable:true },
        labelNoAuditEntries: { label:{en:'No audit entries', pl:'Brak wpisów'}, type:'Text', defaultValue:'Brak wpisów', bindable:true },
        labelAuditSelectUsers: { label:{en:'Select users', pl:'Wybierz pracowników...'}, type:'Text', defaultValue:'Wybierz pracowników...', bindable:true },
        labelAuditShowing: { label:{en:'Showing records', pl:'Wyświetlono'}, type:'Text', defaultValue:'Wyświetlono', bindable:true },
        labelToday: { label:{en:'Today preset', pl:'Dziś'}, type:'Text', defaultValue:'', bindable:true },
        labelDays: { label:{en:'Days label', pl:'dni'}, type:'Text', defaultValue:'', bindable:true },

        // === TEMP GRANTS ===
        labelNoTempGrants: { label:{en:'No temp grants', pl:'Brak aktywnych tymczasowych uprawnień'}, type:'Text', defaultValue:'Brak aktywnych tymczasowych uprawnień', bindable:true },

        // === CONFIRM DIALOGS ===
        labelConfirmDeleteRole: { label:{en:'Confirm delete role', pl:'Potwierdzenie usunięcia roli'}, type:'Text', defaultValue:'Usunąć rolę "{role}"? To usunie ją od wszystkich użytkowników.', bindable:true },
        labelConfirmDeleteRoleTitle: { label:{en:'Delete role title', pl:'Usunięcie roli'}, type:'Text', defaultValue:'Usunięcie roli', bindable:true },
        labelConfirmRemoveRole: { label:{en:'Remove role from user', pl:'Usunięcie roli użytkownikowi'}, type:'Text', defaultValue:'Usunąć rolę "{role}" użytkownikowi {user}?', bindable:true },
        labelConfirmRemoveRoleTitle: { label:{en:'Remove role title', pl:'Usunięcie roli użytkownikowi'}, type:'Text', defaultValue:'Usunięcie roli użytkownikowi', bindable:true },
        labelConfirmRevoke: { label:{en:'Confirm revoke', pl:'Cofnięcie dostępu'}, type:'Text', defaultValue:'Cofnąć tymczasowy dostęp?', bindable:true },
        labelConfirmRevokeTitle: { label:{en:'Revoke title', pl:'Cofnięcie tymczasowego dostępu'}, type:'Text', defaultValue:'Cofnięcie tymczasowego dostępu', bindable:true },
    }
};
