export default {
    editor: {
        label: {
            en: 'Admin Panel',
            ru: 'Админ панель',
            pl: 'Panel administracyjny'
        },
        icon: 'settings',
        customStylePropertiesOrder: [
            ['supabaseUrl', 'supabaseAnonKey'],
            ['accentColor', 'bgColor', 'cardBgColor', 'borderColor', 'textColor', 'textMutedColor']
        ]
    },
    properties: {
        // Supabase connection
        supabaseUrl: {
            label: { en: 'Supabase URL', ru: 'Supabase URL', pl: 'Supabase URL' },
            type: 'Text',
            defaultValue: '',
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            edit: () => ({ placeholder: 'https://xxxxx.supabase.co' }),
            /* wwEditor:end */
        },
        supabaseAnonKey: {
            label: { en: 'Supabase Anon Key', ru: 'Supabase Anon Key', pl: 'Supabase Anon Key' },
            type: 'Text',
            defaultValue: '',
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            edit: () => ({ placeholder: 'eyJhbGciOiJIUzI1NiIs...' }),
            /* wwEditor:end */
        },

        // Theme colors
        accentColor: {
            label: { en: 'Accent Color', pl: 'Kolor akcentu' },
            type: 'Color',
            defaultValue: '#6366f1',
            bindable: true, responsive: true,
        },
        bgColor: {
            label: { en: 'Background', pl: 'Tło' },
            type: 'Color',
            defaultValue: '#0f0f0f',
            bindable: true, responsive: true,
        },
        cardBgColor: {
            label: { en: 'Card Background', pl: 'Tło kart' },
            type: 'Color',
            defaultValue: '#1c1c1c',
            bindable: true, responsive: true,
        },
        borderColor: {
            label: { en: 'Border Color', pl: 'Kolor ramek' },
            type: 'Color',
            defaultValue: '#2a2a28',
            bindable: true, responsive: true,
        },
        textColor: {
            label: { en: 'Text Color', pl: 'Kolor tekstu' },
            type: 'Color',
            defaultValue: '#e8e6e1',
            bindable: true, responsive: true,
        },
        textMutedColor: {
            label: { en: 'Muted Text', pl: 'Tekst wyciszony' },
            type: 'Color',
            defaultValue: '#8a8880',
            bindable: true, responsive: true,
        },
    }
};
