package com.fusioni.digitalmenu;

import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Ensure session persistence & cookie compatibility
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        if (this.bridge != null && this.bridge.getWebView() != null) {
            cookieManager.setAcceptThirdPartyCookies(this.bridge.getWebView(), true);

            // Enhance WebView cache and DOM storage for full offline feature parity
            WebSettings webSettings = this.bridge.getWebView().getSettings();
            webSettings.setDomStorageEnabled(true);
            webSettings.setDatabaseEnabled(true);
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowContentAccess(true);
            webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        }
    }
}
