package ui.siriwave;

import android.app.Activity;
import android.graphics.Color;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import com.alex.siriwaveview.SiriWaveView;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by user on 26/01/18.
 */

public class RNSiriWaveView extends ViewGroupManager<ViewGroup> {

    public static final String REACT_CLASS = "RNSiriWaveView";
    private Activity activity;

    private boolean animating = false;

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    protected FrameLayout createViewInstance(final ThemedReactContext reactContext) {
        activity = reactContext.getCurrentActivity();

        return new FrameLayout(reactContext.getCurrentActivity());
    }

    @ReactProp(name = "props")
    public void setProps(FrameLayout siriWaveViewFrame, ReadableMap props) {
        int width = props.getInt("width");
        int height = props.getInt("height");

        int numberOfWaves = props.getInt("numberOfWaves");
        String backgroundColor = props.getString("backgroundColor");
        String waveColor = props.getString("waveColor");

        int primaryWaveLineWidth = props.getInt("primaryWaveLineWidth");
        int secondaryWaveLineWidth = props.getInt("secondaryWaveLineWidth");

        double frequency = props.getDouble("frequency");
        double idleAmplitude = props.getDouble("idleAmplitude");
        double amplitude = props.getDouble("amplitude");
        double density = props.getDouble("density");
        double phaseShift = props.getDouble("phaseShift");


        SiriWaveView siriWaveView = new SiriWaveView(activity);

        siriWaveView.waveNumber = numberOfWaves;
        siriWaveView.waveColor = Color.parseColor(waveColor);
        siriWaveView.waveHeight = primaryWaveLineWidth;
        siriWaveView.frequency = Double.valueOf(frequency).floatValue();
        siriWaveView.IdleAmplitude = Double.valueOf(idleAmplitude).floatValue();
        siriWaveView.amplitude = Double.valueOf(amplitude).floatValue();

        siriWaveView.init(activity, null);

        animating = true;

        siriWaveViewFrame.addView(siriWaveView);
    }

    @ReactMethod
    public void show(String message, boolean toggleState) {
        SiriWaveView siriWaveView = (SiriWaveView) SiriWaveViewFrame.getChildAt(0);
        if(toggleState){
            if (siriWaveView != null && animating == false && startAnimation) {
                animating = true;
                siriWaveView.startAnimation();
            }
        }else{
            if (siriWaveView != null && animating == true && stopAnimation) {
                animating = false;
                siriWaveView.stopAnimation();
            }
        }
    }
    
    @Override
    public void receiveCommand(
            RNSiriWaveView view,
            int commandType,
            @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        Assertions.assertNotNull(args);
        switch (commandType) {
            case COMMAND_SAVE_IMAGE: {
                view.show(args.getBoolean(1));
                return;
            }

            default:
                throw new IllegalArgumentException(String.format(
                        "Unsupported command %d received by %s.",
                        commandType,
                        getClass().getSimpleName()));
        }
    }
}
