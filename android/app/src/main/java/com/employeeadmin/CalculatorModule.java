package com.employeeadmin;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CalculatorModule extends ReactContextBaseJavaModule {

    public CalculatorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Calculator";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double add(double a, double b) {
        return a + b;
    }
}