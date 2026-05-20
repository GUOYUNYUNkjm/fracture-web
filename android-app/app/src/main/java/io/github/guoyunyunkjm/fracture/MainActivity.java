package io.github.guoyunyunkjm.fracture;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.PermissionRequest;
import android.view.KeyEvent;
import android.widget.ProgressBar;
import android.view.View;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.content.Context;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Color;
import android.view.Gravity;
import android.widget.Button;
import android.os.Build;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private static final String APP_URL = "https://guoyunyunkjm.github.io/fracture-web/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 全屏布局
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);

        // 进度条
        progressBar = new ProgressBar(this, null,
                android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);
        progressBar.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 8));
        layout.addView(progressBar);

        // WebView
        webView = new WebView(this);
        webView.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));

        // WebView 设置
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(false);
        }

        // 保持在 App 内打开链接，不跳转浏览器
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
            }
            @Override
            public void onReceivedError(WebView view, int errorCode,
                    String description, String failingUrl) {
                showOfflinePage();
            }
        });

        // 允许摄像头等权限
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int progress) {
                progressBar.setVisibility(View.VISIBLE);
                progressBar.setProgress(progress);
                if (progress == 100) progressBar.setVisibility(View.GONE);
            }
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                request.grant(request.getResources());
            }
        });

        layout.addView(webView);
        setContentView(layout);

        // 加载网页
        if (isNetworkAvailable()) {
            webView.loadUrl(APP_URL);
        } else {
            showOfflinePage();
        }
    }

    private void showOfflinePage() {
        String html = "<html><body style='background:#1a2e4a;color:white;" +
                "font-family:sans-serif;display:flex;flex-direction:column;" +
                "align-items:center;justify-content:center;height:100vh;" +
                "margin:0;text-align:center;'>" +
                "<h1 style='font-size:48px'>📡</h1>" +
                "<h2>网络未连接</h2>" +
                "<p style='color:#8ab4f8'>请检查网络后重试</p>" +
                "<button onclick='location.reload()' style='background:#2563eb;" +
                "color:white;border:none;padding:12px 32px;border-radius:24px;" +
                "font-size:16px;margin-top:16px;cursor:pointer'>🔄 重试</button>" +
                "</body></html>";
        webView.loadData(html, "text/html", "UTF-8");
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager cm = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = cm.getActiveNetworkInfo();
        return info != null && info.isConnected();
    }

    // 返回键 → 网页后退
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }
}
