package com.analitico.sdkdonapp;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        registerPlugin(GoogleAuth.class);
    }
}
