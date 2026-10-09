// Native Android Bridge Support
(async function initNativeApp() {
    // Check if Capacitor Native runtime is available
    if (window.Capacitor) {
        const { App } = window.Capacitor.Plugins;
        const { Network } = window.Capacitor.Plugins;
        const { StatusBar, Style } = window.Capacitor.Plugins;

        // Configure Status Bar
        try {
            if (StatusBar) {
                await StatusBar.setStyle({ style: Style.Dark });
                await StatusBar.setBackgroundColor({ color: '#1B4D3E' });
            }
        } catch (e) {
            console.warn('StatusBar plugin not initialized:', e);
        }

        // Hardware Back-Button Management
        if (App) {
            App.addListener('backButton', ({ canGoBack }) => {
                // 1. Check if any modal or drawer is open
                const socialsModal = document.getElementById('socialsModal');
                const resModal = document.getElementById('reservationModal');
                const cartDrawer = document.getElementById('cartDrawer');

                if (socialsModal && !socialsModal.classList.contains('hidden')) {
                    socialsModal.classList.add('hidden');
                    return;
                }

                if (resModal && !resModal.classList.contains('hidden')) {
                    resModal.classList.add('hidden');
                    return;
                }
                if (cartDrawer && !cartDrawer.classList.contains('translate-x-full')) {
                    cartDrawer.classList.add('translate-x-full');
                    const overlay = document.getElementById('cartDrawerOverlay');
                    if (overlay) overlay.classList.add('hidden');
                    return;
                }

                // 2. Navigate web history if available
                if (canGoBack && window.location.hash !== '') {
                    window.history.back();
                } else {
                    // 3. Exit app
                    App.exitApp();
                }
            });
        }

        // Offline Network Monitoring
        if (Network) {
            Network.addListener('networkStatusChange', (status) => {
                if (!status.connected) {
                    showOfflineNotice();
                } else {
                    hideOfflineNotice();
                }
            });
        }
    }

    function showOfflineNotice() {
        let banner = document.getElementById('offline-alert-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'offline-alert-banner';
            banner.className = 'fixed bottom-4 left-4 right-4 bg-red-600 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl z-50 flex items-center justify-between';
            banner.innerHTML = '<span>No internet connection. Viewing cached menu.</span><button onclick="this.parentElement.remove()" class="ml-2 font-bold">✕</button>';
            document.body.appendChild(banner);
        }
    }

    function hideOfflineNotice() {
        const banner = document.getElementById('offline-alert-banner');
        if (banner) banner.remove();
    }
})();
