export default {
    editor: {
        label: { en: 'Admin Panel', pl: 'Panel administracyjny' },
        icon: 'settings',
        customStylePropertiesOrder: [
            ['supabaseUrl', 'supabaseAnonKey'],
            ['showSidebar','labelSidebarTitle','labelSidebarSubtitle','sidebarWidth','sidebarBgColor','sidebarBorderColor','sidebarTopOffset','sidebarZIndex'],
            ['navActiveColor','navActiveBg','navInactiveColor','navHoverBg'],
            ['detailTabActiveColor','detailTabActiveBorder'],
            ['contentPadding','contentMaxWidth'],
            ['accentColor','accentHoverColor','bgColor','cardBgColor','cardBorderRadius'],
            ['borderColor','borderLightColor'],
            ['textColor','textMutedColor','textHintColor'],
            ['titleFontSize','titleFontWeight','bodyFontSize','smallFontSize','fontFamily'],
            ['badgeFontSize','badgePadding','badgeBorderRadius'],
            ['inputBgColor','inputBorderColor','inputFocusBorderColor','inputBorderRadius','inputPadding','inputFontSize'],
            ['selectBgColor','selectTextColor','selectBorderColor','selectFontSize','selectOptionBg','selectOptionText','selectBorderRadius','selectHoverBg','selectHoverText'],
            ['btnPrimaryBg','btnPrimaryText','btnPrimaryBorder','btnSecondaryBg','btnSecondaryText','btnSecondaryBorder','btnBorderRadius','btnPadding','btnFontSize'],
            ['btnGhostBg','btnGhostText','btnGhostBorder','btnGhostHoverBorder'],
            ['btnDangerColor','btnDangerBg','btnDangerBorder'],
            ['btnCloseBg','btnCloseText','btnCloseHoverBg','btnCloseHoverText','btnCloseSize','btnCloseBorderRadius'],
            ['tableHeaderBg','tableRowHoverBg','tableRowSelectedBg','tableRowBorderColor'],
            ['statusActiveColor','statusInactiveColor','statusTerminatedColor','statusVacationColor'],
            ['statusActiveTextColor','statusInactiveTextColor','statusTerminatedTextColor','statusVacationTextColor'],
            ['actionActiveBg','actionActiveText','actionActiveBorder'],
            ['odzActiveBg','odzActiveBorder','odzActiveText','odzInactiveBg','odzInactiveBorder','odzInactiveText','odzTempBorder','odzTempBg','odzTempText','odzTempIndicator','odzIndicatorOn','odzIndicatorOff','tempIndicatorColor','tempRoleBorder'],
            ['labelRoleColor'],
            ['overlayBgColor','panelWidth','panelBgColor'],
            ['modalBgColor','modalBorderRadius','modalMaxWidth','modalPadding'],
            ['toastSuccessBg','toastSuccessText','toastErrorBg','toastErrorText','toastInfoBg','toastInfoText'],
            ['chartBg','chartBorder','chartLineColor','chartLineWidth','chartDotColor','chartDotSize','chartGridColor','chartLabelColor','chartHeight','chartAreaOpacity','dateIconFilter'],
            ['diffPositiveColor','diffNegativeColor','diffNeutralColor'],
            ['animationDuration','animationEasing'],
            ['spacingXs','spacingSm','spacingMd','spacingLg','spacingXl'],
            ['labelDashboard','labelUsers','labelRoles','labelAudit','labelTemp'],
            ['labelStatManagers','labelStatClients','labelStatVacation','labelStatPending','labelStatChanges','labelStatTempGrants','labelStatRolesCount','labelStatDepts'],
            ['showStatManagers','showStatClients','showStatVacation','showStatPending','showStatChanges','showStatTempGrants','showStatRolesCount','showStatDepts'],
            ['orderStatManagers','orderStatClients','orderStatVacation','orderStatPending','orderStatChanges','orderStatTempGrants','orderStatRolesCount','orderStatDepts'],
            ['labelRolesDistribution','labelDepartments','labelClientsChart','labelDiffPeriod'],
            ['labelColUser','labelColRoles','labelColDepts','labelColClients','labelColStatus'],
            ['labelStatusActive','labelStatusInactive','labelStatusTerminated','labelStatusVacation'],
            ['labelBtnCopy','labelBtnAddRole','labelBtnTempAccess','labelBtnNewRole','labelBtnEditRole','labelBtnEditPerms','labelBtnApply','labelBtnApplyModified'],
            ['labelBtnExtend','labelBtnRevoke','labelGrantedBy','labelGrantedAt','labelExpiresAt'],
            ['labelSearch','labelAllRoles','labelNoResults','labelSuperAdmin','labelVacation','labelPrev','labelNext'],
            ['labelTabRoles','labelTabVisibility','labelTabDepts','labelUserDepts','labelAllDeptsAccess','labelAssignedRoles','labelPermissions','labelVisibleClients'],
            ['labelAutoFromRoles','labelNoRoles','labelSuperAdminAccess','labelNoPermissions','labelAllRolesAssigned'],
            ['labelAddRoleFor','labelDept'],
            ['labelCopyFrom','labelSelectTarget','labelReviewCopy','labelChangeTarget','labelChanged','labelSummary','labelTarget','labelNone','labelOf','labelSelectAll','labelClearAll'],
            ['labelTempAccessFor','labelTempType','labelTempRole','labelTempDept','labelTempExpires','labelTempReason','labelTempReasonPlaceholder','labelTempApply'],
            ['labelSelectRole','labelSelectDepts'],
            ['labelExtendAccess','labelNewExpiry','labelSave','labelCreate','labelCancel','labelConfirm'],
            ['labelNewRole','labelRoleNamePlaceholder','labelEditRole','labelTemplates','labelSelectTable','labelAddTemplate','labelNoTemplates'],
            ['labelRolesHint','labelUsersCount','labelLegendSelect','labelLegendInsert','labelLegendUpdate','labelLegendDelete','labelLegendAll'],
            ['labelEditPermsFor','labelEditPermsHint','labelAddPermission'],
            ['labelAuditAllTables','labelAuditEmailPlaceholder','labelNoAuditEntries'],
            ['labelNoTempGrants'],
            ['labelConfirmDeleteRole','labelConfirmDeleteRoleTitle','labelConfirmRemoveRole','labelConfirmRemoveRoleTitle','labelConfirmRevoke','labelConfirmRevokeTitle'],
            ['iconNavDashboard','iconNavUsers','iconNavRoles','iconNavAudit','iconNavTemp','navIconSize','navIconColor'],
            ['iconSetup','iconTempIndicator','iconClose','iconEdit','iconDelete','iconCheckmark','iconSize']
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
        sidebarTopOffset: { label:{en:'Sidebar Top Offset', pl:'Offset górny sidebara'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:200}]}, defaultValue:'0px', bindable:true, responsive:true },
        sidebarZIndex: { label:{en:'Sidebar Z-Index'}, type:'Number', options:{min:0,max:9999,step:1}, defaultValue:0, bindable:true },

        // === NAV ===
        navActiveColor: { label:{en:'Nav Active Text'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        navActiveBg: { label:{en:'Nav Active BG'}, type:'Color', defaultValue:'rgba(99,102,241,0.12)', bindable:true, responsive:true },
        navInactiveColor: { label:{en:'Nav Inactive Text'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },
        navHoverBg: { label:{en:'Nav Hover BG'}, type:'Color', defaultValue:'rgba(99,102,241,0.06)', bindable:true, responsive:true },

        // === DETAIL TAB ===
        detailTabActiveColor: { label:{en:'Detail Tab Active Text', pl:'Kolor aktywnej zakładki w detalu'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        detailTabActiveBorder: { label:{en:'Detail Tab Active Border', pl:'Kolor obramowania aktywnej zakładki'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },

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
        selectBorderRadius: { label:{en:'Select Radius', pl:'Select: zaokrąglenie'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:20}]}, defaultValue:'8px', bindable:true, responsive:true },
        selectHoverBg: { label:{en:'Select Hover BG'}, type:'Color', defaultValue:'rgba(99,102,241,0.15)', bindable:true, responsive:true },
        selectHoverText: { label:{en:'Select Hover Text'}, type:'Color', defaultValue:'#ffffff', bindable:true, responsive:true },

        // === BUTTONS ===
        btnPrimaryBg: { label:{en:'Btn BG'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },
        btnPrimaryText: { label:{en:'Btn Text'}, type:'Color', defaultValue:'#ffffff', bindable:true, responsive:true },
        btnPrimaryBorder: { label:{en:'Btn Border', pl:'Btn: ramka'}, type:'Color', defaultValue:'transparent', bindable:true, responsive:true },
        btnSecondaryBg: { label:{en:'Btn2 BG'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        btnSecondaryText: { label:{en:'Btn2 Text'}, type:'Color', defaultValue:'#e8e6e1', bindable:true, responsive:true },
        btnSecondaryBorder: { label:{en:'Btn2 Border', pl:'Btn2: ramka'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },
        btnBorderRadius: { label:{en:'Btn Radius'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:20}]}, defaultValue:'8px', bindable:true, responsive:true },
        btnPadding: { label:{en:'Btn Pad'}, type:'Text', defaultValue:'8px 14px', bindable:true },
        btnFontSize: { label:{en:'Btn Font'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:18}]}, defaultValue:'12px', bindable:true, responsive:true },

        // === GHOST BUTTON ===
        btnGhostBg: { label:{en:'Ghost BG', pl:'Ghost: tło'}, type:'Color', defaultValue:'#1c1c1c', bindable:true, responsive:true },
        btnGhostText: { label:{en:'Ghost Text', pl:'Ghost: tekst'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },
        btnGhostBorder: { label:{en:'Ghost Border', pl:'Ghost: ramka'}, type:'Color', defaultValue:'#2a2a28', bindable:true, responsive:true },
        btnGhostHoverBorder: { label:{en:'Ghost Hover Border', pl:'Ghost: ramka hover'}, type:'Color', defaultValue:'#6366f1', bindable:true, responsive:true },

        // === DANGER BUTTON ===
        btnDangerColor: { label:{en:'Danger Text', pl:'Danger: tekst'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        btnDangerBg: { label:{en:'Danger BG', pl:'Danger: tło'}, type:'Color', defaultValue:'transparent', bindable:true },
        btnDangerBorder: { label:{en:'Danger Border', pl:'Danger: ramka'}, type:'Color', defaultValue:'#ef4444', bindable:true },

        // === CLOSE BUTTON ===
        btnCloseBg: { label:{en:'Close BG', pl:'Zamknij: tło'}, type:'Color', defaultValue:'transparent', bindable:true },
        btnCloseText: { label:{en:'Close Color', pl:'Zamknij: kolor'}, type:'Color', defaultValue:'#8a8880', bindable:true },
        btnCloseHoverBg: { label:{en:'Close Hover BG', pl:'Zamknij: tło hover'}, type:'Color', defaultValue:'rgba(255,255,255,0.06)', bindable:true },
        btnCloseHoverText: { label:{en:'Close Hover Color', pl:'Zamknij: kolor hover'}, type:'Color', defaultValue:'#e8e6e1', bindable:true },
        btnCloseSize: { label:{en:'Close Btn Size', pl:'Zamknij: rozmiar'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:20,max:48}]}, defaultValue:'28px', bindable:true, responsive:true },
        btnCloseBorderRadius: { label:{en:'Close Radius', pl:'Zamknij: zaokrąglenie'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:0,max:20}]}, defaultValue:'6px', bindable:true, responsive:true },

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

        // === ACTION TOGGLE ===
        actionActiveBg: { label:{en:'Action Active BG'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        actionActiveText: { label:{en:'Action Active Text'}, type:'Color', defaultValue:'#ffffff', bindable:true },
        actionActiveBorder: { label:{en:'Action Active Border'}, type:'Color', defaultValue:'#6366f1', bindable:true },

        // === DEPARTMENT VIEW COLORS ===
        odzActiveBg: { label:{en:'Dept Active BG', pl:'Oddział aktywny: tło'}, type:'Color', defaultValue:'rgba(99,102,241,0.15)', bindable:true },
        odzActiveBorder: { label:{en:'Dept Active Border', pl:'Oddział aktywny: ramka'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        odzActiveText: { label:{en:'Dept Active Text', pl:'Oddział aktywny: tekst'}, type:'Color', defaultValue:'#a5b4fc', bindable:true },
        odzInactiveBg: { label:{en:'Dept Inactive BG', pl:'Oddział nieaktywny: tło'}, type:'Color', defaultValue:'transparent', bindable:true },
        odzInactiveBorder: { label:{en:'Dept Inactive Border', pl:'Oddział nieaktywny: ramka'}, type:'Color', defaultValue:'#2a2a28', bindable:true },
        odzInactiveText: { label:{en:'Dept Inactive Text', pl:'Oddział nieaktywny: tekst'}, type:'Color', defaultValue:'#555555', bindable:true },
        odzTempBorder: { label:{en:'Dept Temp Border', pl:'Oddział tymczасowy: ramka'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        odzTempBg: { label:{en:'Dept Temp BG', pl:'Oddział tymczasowy: tło'}, type:'Color', defaultValue:'rgba(245,158,11,0.1)', bindable:true },
        odzTempText: { label:{en:'Dept Temp Text', pl:'Oddział tymczasowy: tekst'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        odzIndicatorOn: { label:{en:'Dept Indicator On', pl:'Wskaźnik oddziału: aktywny'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        odzIndicatorOff: { label:{en:'Dept Indicator Off', pl:'Wskaźnik oddziału: nieaktywny'}, type:'Color', defaultValue:'#333333', bindable:true },
        odzTempIndicator: { label:{en:'Dept Temp Indicator', pl:'Oddział tymczasowy: wskaźnik'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        tempIndicatorColor: { label:{en:'Temp Icon Color', pl:'Kolor ikony tymczasowej'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        tempRoleBorder: { label:{en:'Temp Role Border', pl:'Tymczasowa rola: ramka'}, type:'Color', defaultValue:'#f59e0b', bindable:true },

        // === ROLE BADGE COLORS ===
        labelRoleColor: { label:{en:'Role editor: Color section label', pl:'Kolor roli'}, type:'Text', defaultValue:'Kolor roli', bindable:true },

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
        orderStatManagers: { label:{en:'Order: Managers (1-8)', pl:'Kolejność: Menedżerowie'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:1, bindable:true },
        orderStatClients: { label:{en:'Order: Clients', pl:'Kolejność: Klienci'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:2, bindable:true },
        orderStatVacation: { label:{en:'Order: Vacation', pl:'Kolejność: Urlopy'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:3, bindable:true },
        orderStatPending: { label:{en:'Order: Pending', pl:'Kolejność: Oczekujące'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:4, bindable:true },
        orderStatChanges: { label:{en:'Order: Changes', pl:'Kolejność: Zmiany'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:5, bindable:true },
        orderStatTempGrants: { label:{en:'Order: Temp Grants', pl:'Kolejność: Tymczasowe'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:6, bindable:true },
        orderStatRolesCount: { label:{en:'Order: Roles Count', pl:'Kolejność: Role'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:7, bindable:true },
        orderStatDepts: { label:{en:'Order: Departments', pl:'Kolejność: Oddziały'}, type:'Number', options:{min:1,max:8,step:1}, defaultValue:8, bindable:true },

        // === STAT CARD ACCENT COLORS ===
        statManagersColor: { label:{en:'Stat color: Managers', pl:'Kolor paska: Menedżerowie'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        statClientsColor: { label:{en:'Stat color: Clients', pl:'Kolor paska: Klienci'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        statVacationColor: { label:{en:'Stat color: Vacation', pl:'Kolor paska: Urlopy'}, type:'Color', defaultValue:'#eab308', bindable:true },
        statPendingColor: { label:{en:'Stat color: Pending', pl:'Kolor paska: Oczekujące'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        statChangesColor: { label:{en:'Stat color: Changes', pl:'Kolor paska: Zmiany'}, type:'Color', defaultValue:'#8b5cf6', bindable:true },
        statTempColor: { label:{en:'Stat color: Temp Grants', pl:'Kolor paska: Tymczasowe'}, type:'Color', defaultValue:'#f59e0b', bindable:true },
        statRolesColor: { label:{en:'Stat color: Roles', pl:'Kolor paska: Role'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        statDeptsColor: { label:{en:'Stat color: Departments', pl:'Kolor paska: Oddziały'}, type:'Color', defaultValue:'#0ea5e9', bindable:true },
        labelRolesDistribution: { label:{en:'Section: Roles Distribution'}, type:'Text', defaultValue:'Rozkład ról', bindable:true },
        labelDepartments: { label:{en:'Section: Departments'}, type:'Text', defaultValue:'Oddziały', bindable:true },
        labelClientsChart: { label:{en:'Section: Clients Chart'}, type:'Text', defaultValue:'Aktywni klienci — wykres', bindable:true },
        labelDiffPeriod: { label:{en:'Label: Diff period hint'}, type:'Text', defaultValue:'różnica 30 dni', bindable:true },

        // === TABLE COLUMN LABELS ===
        labelColUser: { label:{en:'Col: User header text', pl:'Nagłówek kolumny: Użytkownik'}, type:'Text', defaultValue:'UŻYTKOWNIK', bindable:true },
        labelColRoles: { label:{en:'Col: Roles header text', pl:'Nagłówek kolumny: Role'}, type:'Text', defaultValue:'ROLE', bindable:true },
        labelColDepts: { label:{en:'Col: Depts header text', pl:'Nagłówek kolumny: Oddziały'}, type:'Text', defaultValue:'ODDZIAŁY', bindable:true },
        labelColClients: { label:{en:'Col: Clients header text', pl:'Nagłówek kolumny: Klienci'}, type:'Text', defaultValue:'KLIENCI', bindable:true },
        labelColStatus: { label:{en:'Col: Status header text', pl:'Nagłówek kolumny: Status'}, type:'Text', defaultValue:'STATUS', bindable:true },

        // === STATUS LABELS ===
        labelStatusActive: { label:{en:'Status text: Active', pl:'Tekst statusu: Aktywny'}, type:'Text', defaultValue:'Aktywny', bindable:true },
        labelStatusInactive: { label:{en:'Status text: Inactive', pl:'Tekst statusu: Nieaktywny'}, type:'Text', defaultValue:'Nieaktywny', bindable:true },
        labelStatusTerminated: { label:{en:'Status text: Terminated', pl:'Tekst statusu: Zwolniony'}, type:'Text', defaultValue:'Zwolniony', bindable:true },
        labelStatusVacation: { label:{en:'Status text: Vacation', pl:'Tekst statusu: Urlop'}, type:'Text', defaultValue:'Urlop', bindable:true },

        // === BUTTON LABELS ===
        labelBtnCopy: { label:{en:'Btn: Copy permissions text', pl:'Przycisk: Kopiuj uprawnienia'}, type:'Text', defaultValue:'Kopiuj uprawnienia na...', bindable:true },
        labelBtnAddRole: { label:{en:'Btn: Add role text', pl:'Przycisk: Dodaj rolę'}, type:'Text', defaultValue:'+ Dodaj rolę', bindable:true },
        labelBtnTempAccess: { label:{en:'Btn: Temp access text', pl:'Przycisk: Tymczasowy dostęp'}, type:'Text', defaultValue:'⏱ Tymczasowy dostęp', bindable:true },
        labelBtnNewRole: { label:{en:'Btn: New role text', pl:'Przycisk: Nowa rola'}, type:'Text', defaultValue:'+ Nowa rola', bindable:true },
        labelBtnEditRole: { label:{en:'Btn: Edit role text', pl:'Przycisk: Edytuj rolę'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnEditPerms: { label:{en:'Btn: Edit permissions text', pl:'Przycisk: Edytuj uprawnienia'}, type:'Text', defaultValue:'Edytuj', bindable:true },
        labelBtnApply: { label:{en:'Btn: Apply copy text', pl:'Przycisk: Zastosuj kopię'}, type:'Text', defaultValue:'Zastosuj kopię', bindable:true },
        labelBtnApplyModified: { label:{en:'Btn: Apply modified text', pl:'Przycisk: Zastosuj ze zmianami'}, type:'Text', defaultValue:'Zastosuj ze zmianami', bindable:true },
        labelBtnExtend: { label:{en:'Btn: Extend access text', pl:'Przycisk: Przedłuż'}, type:'Text', defaultValue:'Przedłuż', bindable:true },
        labelBtnRevoke: { label:{en:'Btn: Revoke access text', pl:'Przycisk: Cofnij'}, type:'Text', defaultValue:'Cofnij', bindable:true },
        labelGrantedBy: { label:{en:'Label: Granted by text', pl:'Etykieta: Nadane przez'}, type:'Text', defaultValue:'Nadane przez', bindable:true },
        labelGrantedAt: { label:{en:'Label: Granted at text', pl:'Etykieta: Nadano'}, type:'Text', defaultValue:'Nadano', bindable:true },
        labelExpiresAt: { label:{en:'Label: Expires at text', pl:'Etykieta: Wygasa'}, type:'Text', defaultValue:'Wygasa', bindable:true },

        // === SEARCH / FILTER ===
        labelSearch: { label:{en:'Search input placeholder', pl:'Placeholder pola wyszukiwania'}, type:'Text', defaultValue:'Szukaj po nazwisku lub email...', bindable:true },
        labelAllRoles: { label:{en:'Role filter: All option text', pl:'Filtr ról: tekst Wszystkie'}, type:'Text', defaultValue:'Wszystkie role', bindable:true },
        labelNoResults: { label:{en:'Empty state: No results text', pl:'Brak wyników'}, type:'Text', defaultValue:'Brak wyników', bindable:true },
        labelSuperAdmin: { label:{en:'Badge: Super Admin text', pl:'Odznaka: SuperAdmin'}, type:'Text', defaultValue:'SuperAdmin', bindable:true },
        labelVacation: { label:{en:'Badge: Vacation text', pl:'Odznaka: Urlop'}, type:'Text', defaultValue:'URLOP', bindable:true },
        labelPrev: { label:{en:'Pagination: Previous text', pl:'Paginacja: Wstecz'}, type:'Text', defaultValue:'Wstecz', bindable:true },
        labelNext: { label:{en:'Pagination: Next text', pl:'Paginacja: Dalej'}, type:'Text', defaultValue:'Dalej', bindable:true },

        // === DETAIL TABS ===
        labelTabRoles: { label:{en:'Tab: Roles & permissions text', pl:'Zakładka: Role i uprawnienia'}, type:'Text', defaultValue:'Role i uprawnienia', bindable:true },
        labelTabVisibility: { label:{en:'Tab: Visibility', pl:'Zakładka: Widoczność klientów'}, type:'Text', defaultValue:'Widoczność klientów', bindable:true },
        labelTabDepts: { label:{en:'Tab: Departments', pl:'Zakładka: Oddziały'}, type:'Text', defaultValue:'Oddziały', bindable:true },
        labelUserDepts: { label:{en:'Section: User departments', pl:'Nagłówek: Dostępne oddziały'}, type:'Text', defaultValue:'Dostępne oddziały', bindable:true },
        labelAllDeptsAccess: { label:{en:'Label: Full dept access', pl:'Tekst: Pełny dostęp do wszystkich oddziałów'}, type:'Text', defaultValue:'Pełny dostęp — wszystkie oddziały', bindable:true },
        labelAssignedRoles: { label:{en:'Section: Assigned roles header', pl:'Nagłówek sekcji: Przypisane role'}, type:'Text', defaultValue:'Przypisane role', bindable:true },
        labelPermissions: { label:{en:'Section: Permissions header', pl:'Nagłówek sekcji: Uprawnienia'}, type:'Text', defaultValue:'Uprawnienia', bindable:true },
        labelVisibleClients: { label:{en:'Label below client count', pl:'Tekst pod liczbą klientów'}, type:'Text', defaultValue:'widocznych klientów', bindable:true },
        labelAutoFromRoles: { label:{en:'Badge: Auto from roles', pl:'Odznaka: automatyczne z ról'}, type:'Text', defaultValue:'auto z ról', bindable:true },
        labelNoRoles: { label:{en:'Empty: No roles assigned', pl:'Brak przypisanych ról'}, type:'Text', defaultValue:'Brak ról', bindable:true },
        labelSuperAdminAccess: { label:{en:'Empty: SA full access text', pl:'Tekst pełnego dostępu SA'}, type:'Text', defaultValue:'Super admin — pełny dostęp', bindable:true },
        labelNoPermissions: { label:{en:'Empty: No permissions text', pl:'Brak uprawnień'}, type:'Text', defaultValue:'Brak uprawnień', bindable:true },
        labelAllRolesAssigned: { label:{en:'Empty: All roles assigned', pl:'Wszystkie role przypisane'}, type:'Text', defaultValue:'Wszystkie role przypisane', bindable:true },
        labelAddRoleFor: { label:{en:'Modal title: Add role for...', pl:'Tytuł modalu: Dodaj rolę —'}, type:'Text', defaultValue:'Dodaj rolę —', bindable:true },
        labelDept: { label:{en:'Label: Department', pl:'Etykieta: Oddział'}, type:'Text', defaultValue:'Oddział', bindable:true },

        // === COPY MODAL ===
        labelCopyFrom: { label:{en:'Copy modal title: Copy from...', pl:'Tytuł: Kopiuj z'}, type:'Text', defaultValue:'Kopiuj z', bindable:true },
        labelSelectTarget: { label:{en:'Copy: Select target subtitle', pl:'Podtytuł: Wybierz cel'}, type:'Text', defaultValue:'Wybierz cel', bindable:true },
        labelReviewCopy: { label:{en:'Copy: Review step title', pl:'Tytuł: Sprawdź i dostosuj'}, type:'Text', defaultValue:'Sprawdź i dostosuj', bindable:true },
        labelChangeTarget: { label:{en:'Copy: Change target btn', pl:'Przycisk: Zmień cel'}, type:'Text', defaultValue:'Zmień cel', bindable:true },
        labelChanged: { label:{en:'Copy: Changed badge text', pl:'Odznaka: zmienione'}, type:'Text', defaultValue:'zmienione', bindable:true },
        labelSummary: { label:{en:'Copy: Summary header', pl:'Nagłówek: Podsumowanie'}, type:'Text', defaultValue:'Podsumowanie', bindable:true },
        labelTarget: { label:{en:'Copy: Target label', pl:'Etykieta: Cel'}, type:'Text', defaultValue:'Cel', bindable:true },
        labelNone: { label:{en:'Copy: None text', pl:'Tekst: brak'}, type:'Text', defaultValue:'brak', bindable:true },
        labelOf: { label:{en:'Copy: Of text (X of Y)', pl:'Tekst: z (X z Y)'}, type:'Text', defaultValue:'z', bindable:true },
        labelSelectAll: { label:{en:'Btn: Select all', pl:'Przycisk: Zaznacz wszystkie'}, type:'Text', defaultValue:'Zaznacz wszystkie', bindable:true },
        labelClearAll: { label:{en:'Btn: Clear all', pl:'Przycisk: Wyczyść'}, type:'Text', defaultValue:'Wyczyść', bindable:true },

        // === TEMP GRANT MODAL ===
        labelTempAccessFor: { label:{en:'Temp modal title: Access for...', pl:'Tytuł: Tymczasowy dostęp —'}, type:'Text', defaultValue:'Tymczasowy dostęp —', bindable:true },
        labelTempType: { label:{en:'Temp: Type section header', pl:'Nagłówek sekcji: Typ'}, type:'Text', defaultValue:'Typ', bindable:true },
        labelTempRole: { label:{en:'Temp: Role toggle text', pl:'Przełącznik: Rola'}, type:'Text', defaultValue:'Rola', bindable:true },
        labelTempDept: { label:{en:'Temp: Dept toggle text', pl:'Przełącznik: Oddział'}, type:'Text', defaultValue:'Oddział', bindable:true },
        labelTempExpires: { label:{en:'Temp: Expires label', pl:'Etykieta: Wygasa (czas polski)'}, type:'Text', defaultValue:'Wygasa (czas polski)', bindable:true },
        labelTempReason: { label:{en:'Temp: Reason label', pl:'Etykieta: Powód'}, type:'Text', defaultValue:'Powód (opcjonalnie)', bindable:true },
        labelTempReasonPlaceholder: { label:{en:'Temp: Reason placeholder', pl:'Placeholder: np. zastępstwo za...'}, type:'Text', defaultValue:'np. zastępstwo za...', bindable:true },
        labelTempApply: { label:{en:'Temp: Apply btn text', pl:'Przycisk: Nadaj tymczasowy dostęp'}, type:'Text', defaultValue:'Nadaj tymczasowy dostęp', bindable:true },
        labelSelectRole: { label:{en:'Temp: Select role header', pl:'Nagłówek: Wybierz rolę'}, type:'Text', defaultValue:'Wybierz rolę', bindable:true },
        labelSelectDepts: { label:{en:'Temp: Select depts header', pl:'Nagłówek: Wybierz oddziały'}, type:'Text', defaultValue:'Wybierz oddziały', bindable:true },

        // === EXTEND / OTHER MODALS ===
        labelExtendAccess: { label:{en:'Extend modal title', pl:'Tytuł: Przedłuż dostęp'}, type:'Text', defaultValue:'Przedłuż dostęp', bindable:true },
        labelNewExpiry: { label:{en:'Extend: New expiry label', pl:'Etykieta: Nowa data wygaśnięcia'}, type:'Text', defaultValue:'Nowa data wygaśnięcia', bindable:true },
        labelSave: { label:{en:'Btn: Save', pl:'Przycisk: Zapisz'}, type:'Text', defaultValue:'Zapisz', bindable:true },
        labelCreate: { label:{en:'Btn: Create', pl:'Przycisk: Utwórz'}, type:'Text', defaultValue:'Utwórz', bindable:true },
        labelCancel: { label:{en:'Btn: Cancel', pl:'Przycisk: Anuluj'}, type:'Text', defaultValue:'Anuluj', bindable:true },
        labelConfirm: { label:{en:'Btn: Confirm', pl:'Przycisk: Potwierdź'}, type:'Text', defaultValue:'Potwierdź', bindable:true },

        // === ROLE EDITING ===
        labelNewRole: { label:{en:'Create role modal title', pl:'Tytuł: Nowa rola'}, type:'Text', defaultValue:'Nowa rola', bindable:true },
        labelRoleNamePlaceholder: { label:{en:'Role name input placeholder', pl:'Placeholder: Nazwa roli...'}, type:'Text', defaultValue:'Nazwa roli...', bindable:true },
        labelEditRole: { label:{en:'Edit role modal title', pl:'Tytuł: Edycja roli'}, type:'Text', defaultValue:'Edycja roli', bindable:true },
        labelTemplates: { label:{en:'Section: Permission templates', pl:'Nagłówek: Szablony uprawnień'}, type:'Text', defaultValue:'Szablony uprawnień', bindable:true },
        labelSelectTable: { label:{en:'Template: Select table dropdown', pl:'Dropdown: Wybierz tabelę'}, type:'Text', defaultValue:'Wybierz tabelę', bindable:true },
        labelAddTemplate: { label:{en:'Btn: Add template', pl:'Przycisk: Dodaj szablon'}, type:'Text', defaultValue:'Dodaj szablon', bindable:true },
        labelNoTemplates: { label:{en:'Empty: No templates', pl:'Brak szablonów'}, type:'Text', defaultValue:'Brak szablonów', bindable:true },
        labelRolesHint: { label:{en:'Roles page: Hint text', pl:'Podpowiedź na stronie ról'}, type:'Text', defaultValue:'Zmiana szablonu automatycznie aktualizuje uprawnienia wszystkich użytkowników z tą rolą.', bindable:true },
        labelLegendSelect: { label:{en:'Legend: SELECT description', pl:'Legenda: SELECT'}, type:'Text', defaultValue:'Odczyt danych z tabeli', bindable:true },
        labelLegendInsert: { label:{en:'Legend: INSERT description', pl:'Legenda: INSERT'}, type:'Text', defaultValue:'Dodawanie nowych rekordów', bindable:true },
        labelLegendUpdate: { label:{en:'Legend: UPDATE description', pl:'Legenda: UPDATE'}, type:'Text', defaultValue:'Edycja istniejących rekordów', bindable:true },
        labelLegendDelete: { label:{en:'Legend: DELETE description', pl:'Legenda: DELETE'}, type:'Text', defaultValue:'Usuwanie rekordów', bindable:true },
        labelLegendAll: { label:{en:'Legend: ALL description', pl:'Legenda: ALL'}, type:'Text', defaultValue:'Pełny dostęp (wszystkie operacje)', bindable:true },
        labelUsersCount: { label:{en:'Roles: Users count suffix', pl:'Przyrostek: użytk.'}, type:'Text', defaultValue:'użytk.', bindable:true },

        // === PERMISSIONS EDITING ===
        labelEditPermsFor: { label:{en:'Edit perms modal title prefix', pl:'Tytuł: Edycja uprawnień —'}, type:'Text', defaultValue:'Edycja uprawnień —', bindable:true },
        labelEditPermsHint: { label:{en:'Edit perms: Hint text', pl:'Podpowiedź: Ręczna zmiana nadpisuje auto'}, type:'Text', defaultValue:'Ręczna zmiana uprawnień nadpisuje automatyczne uprawnienia z ról.', bindable:true },
        labelAddPermission: { label:{en:'Btn: Add permission', pl:'Przycisk: Dodaj uprawnienie'}, type:'Text', defaultValue:'Dodaj uprawnienie', bindable:true },

        // === AUDIT ===
        labelAuditAllTables: { label:{en:'Audit filter: All tables option', pl:'Filtr audytu: Wszystkie'}, type:'Text', defaultValue:'Wszystkie', bindable:true },
        labelAuditEmailPlaceholder: { label:{en:'Audit: Email search placeholder', pl:'Placeholder: Wyszukaj Email...'}, type:'Text', defaultValue:'Wyszukaj Email...', bindable:true },
        labelNoAuditEntries: { label:{en:'Audit: No entries text', pl:'Brak wpisów audytu'}, type:'Text', defaultValue:'Brak wpisów', bindable:true },

        // === TEMP GRANTS ===
        labelNoTempGrants: { label:{en:'Temp: No active grants text', pl:'Brak aktywnych tymczasowych uprawnień'}, type:'Text', defaultValue:'Brak aktywnych tymczasowych uprawnień', bindable:true },

        // === CONFIRM ===
        labelConfirmDeleteRole: { label:{en:'Confirm: Delete role message ({role} placeholder)', pl:'Komunikat potwierdzenia usunięcia roli'}, type:'Text', defaultValue:'Usunąć rolę "{role}"? To usunie ją od wszystkich użytkowników.', bindable:true },
        labelConfirmDeleteRoleTitle: { label:{en:'Confirm: Delete role title', pl:'Tytuł: Usunięcie roli'}, type:'Text', defaultValue:'Usunięcie roli', bindable:true },
        labelConfirmRemoveRole: { label:{en:'Confirm: Remove role message ({role}, {user})', pl:'Komunikat usunięcia roli użytkownikowi'}, type:'Text', defaultValue:'Usunąć rolę "{role}" użytkownikowi {user}?', bindable:true },
        labelConfirmRemoveRoleTitle: { label:{en:'Confirm: Remove role title', pl:'Tytuł: Usunięcie roli użytkownikowi'}, type:'Text', defaultValue:'Usunięcie roli użytkownikowi', bindable:true },
        labelConfirmRevoke: { label:{en:'Confirm: Revoke grant message', pl:'Komunikat cofnięcia dostępu'}, type:'Text', defaultValue:'Cofnąć tymczasowy dostęp?', bindable:true },
        labelConfirmRevokeTitle: { label:{en:'Confirm: Revoke grant title', pl:'Tytuł: Cofnięcie tymczasowego dostępu'}, type:'Text', defaultValue:'Cofnięcie tymczasowego dostępu', bindable:true },

        // === CHART ===
        chartBg: { label:{en:'Chart BG'}, type:'Color', defaultValue:'transparent', bindable:true },
        chartBorder: { label:{en:'Chart Border'}, type:'Color', defaultValue:'#2a2a28', bindable:true },
        chartLineColor: { label:{en:'Chart Line Color'}, type:'Color', defaultValue:'#6366f1', bindable:true },
        chartLineWidth: { label:{en:'Chart Line Width'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:1,max:5}]}, defaultValue:'2px', bindable:true },
        chartDotColor: { label:{en:'Chart Dot Color'}, type:'Color', defaultValue:'#818cf8', bindable:true },
        chartDotSize: { label:{en:'Chart Dot Size'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:2,max:8}]}, defaultValue:'4px', bindable:true },
        chartGridColor: { label:{en:'Chart Grid Color'}, type:'Color', defaultValue:'rgba(255,255,255,0.05)', bindable:true },
        chartLabelColor: { label:{en:'Chart Label Color'}, type:'Color', defaultValue:'#8a8880', bindable:true },
        chartHeight: { label:{en:'Chart Height'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:100,max:500}]}, defaultValue:'200px', bindable:true, responsive:true },
        chartAreaOpacity: { label:{en:'Chart Area Opacity'}, type:'Number', options:{min:0,max:1,step:0.05}, defaultValue:0.15, bindable:true },
        dateIconFilter: { label:{en:'Date Icon Filter (CSS filter)'}, type:'Text', defaultValue:'invert(0.6)', bindable:true },

        // === DIFF COLORS ===
        diffPositiveColor: { label:{en:'Diff Positive', pl:'Różnica: wzrost'}, type:'Color', defaultValue:'#22c55e', bindable:true },
        diffNegativeColor: { label:{en:'Diff Negative', pl:'Różnica: spadek'}, type:'Color', defaultValue:'#ef4444', bindable:true },
        diffNeutralColor: { label:{en:'Diff Neutral', pl:'Różnica: bez zmian'}, type:'Color', defaultValue:'#8a8880', bindable:true },

        // === ICONS — NAV ===
        iconNavDashboard: { label:{en:'Icon: Dashboard nav', pl:'Ikona: Dashboard'}, type:'SystemIcon', bindable:true },
        iconNavUsers: { label:{en:'Icon: Users nav', pl:'Ikona: Użytkownicy'}, type:'SystemIcon', bindable:true },
        iconNavRoles: { label:{en:'Icon: Roles nav', pl:'Ikona: Role'}, type:'SystemIcon', bindable:true },
        iconNavAudit: { label:{en:'Icon: Audit nav', pl:'Ikona: Audyt'}, type:'SystemIcon', bindable:true },
        iconNavTemp: { label:{en:'Icon: Temporary nav', pl:'Ikona: Tymczasowe'}, type:'SystemIcon', bindable:true },
        navIconSize: { label:{en:'Nav Icon Size', pl:'Rozmiar ikony nawigacji'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:10,max:40}]}, defaultValue:'18px', bindable:true, responsive:true },
        navIconColor: { label:{en:'Nav Icon Color (filter tint)', pl:'Kolor ikony nawigacji'}, type:'Color', defaultValue:'#8a8880', bindable:true, responsive:true },

        // === ICONS — GENERAL ===
        iconSetup: { label:{en:'Icon: Setup/loading screen', pl:'Ikona: Ekran ładowania'}, type:'SystemIcon', bindable:true },
        iconTempIndicator: { label:{en:'Icon: Temp access indicator', pl:'Ikona: Wskaźnik tymczasowego dostępu'}, type:'SystemIcon', bindable:true },
        iconClose: { label:{en:'Icon: Close/dismiss', pl:'Ikona: Zamknij'}, type:'SystemIcon', bindable:true },
        iconEdit: { label:{en:'Icon: Edit', pl:'Ikona: Edytuj'}, type:'SystemIcon', bindable:true },
        iconDelete: { label:{en:'Icon: Delete', pl:'Ikona: Usuń'}, type:'SystemIcon', bindable:true },
        iconCheckmark: { label:{en:'Icon: Checkmark', pl:'Ikona: Zaznaczenie'}, type:'SystemIcon', bindable:true },
        iconSize: { label:{en:'General Icon Size', pl:'Rozmiar ikon ogólnych'}, type:'Length', options:{unitChoices:[{value:'px',label:'px',min:8,max:32}]}, defaultValue:'14px', bindable:true, responsive:true },
    }
};
