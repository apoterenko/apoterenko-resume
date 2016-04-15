package com.omendba.shop.mobile;

import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;
import javax.microedition.io.*;
import org.ksoap2.*;
import org.ksoap2.transport.*;
import org.ksoap2.serialization.*;
import java.io.*;

class threadShop extends Thread {
    public TextField tf2;
    public TextField tf3;
    public TextField tf4;
    public void run() {
        String site = readSite();
        if (site == null) return;
        String endPointURL = "http://"+site+"/axis/ForMidlet.jws";
        HttpTransport rpc = new HttpTransport(endPointURL);
        SoapEnvelope envelope =
                new SoapSerializationEnvelope(SoapEnvelope.VER10);
        getData(tf3, endPointURL, envelope, rpc, "getCount5");
        getData(tf4, endPointURL, envelope, rpc, "getCount6");
        getData(tf2, endPointURL, envelope, rpc, "getCount2");
    }
    private String readSite() {
        try {
            InputStream is = getClass().getResourceAsStream("shop.properties");
            InputStreamReader reader = new InputStreamReader(is);
            String site = "";
            while (reader.ready()) {
                int ch = reader.read();
                site += ((char) ch);
            }
            is.close();
            return site;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    private void getData(TextField tf, String endPointURL, SoapEnvelope envelope,
            HttpTransport rpc, String getCount_) {
        SoapObject getCount = new SoapObject(endPointURL, getCount_);
        envelope.bodyOut = getCount;
        try {
            rpc.call(null, envelope);
        } catch (Exception e) {}
        SoapObject ret = (SoapObject) envelope.bodyIn;
        String echo = String.valueOf(ret.getProperty(0));
        tf.setString(echo);
    }
}

public class GetData extends MIDlet implements CommandListener {
    
    
    public GetData() {
    }
    
    private Form form1;//GEN-BEGIN:MVDFields
    private Command okCommand1;
    private Command okCommand2;
    private Command component1;
    private Form form2;
    private Command okCommand4;
    private TextField textField2;
    private TextField textField3;
    private TextField textField4;
    private StringItem stringItem1;
    private Font font1;
    private Command okCommand3;
    private Command okCommand5;//GEN-END:MVDFields
    
//GEN-LINE:MVDMethods
    
    /** This method initializes UI of the application.//GEN-BEGIN:MVDInitBegin
     */
    private void initialize() {//GEN-END:MVDInitBegin
        // Insert pre-init code here
        getDisplay().setCurrent(get_form1());//GEN-LINE:MVDInitInit
        // Insert post-init code here
    }//GEN-LINE:MVDInitEnd
    
    /** Called by the system to indicate that a command has been invoked on a particular displayable.//GEN-BEGIN:MVDCABegin
     * @param command the Command that ws invoked
     * @param displayable the Displayable on which the command was invoked
     */
    public void commandAction(Command command, Displayable displayable) {//GEN-END:MVDCABegin
        // Insert global pre-action code here
        if (displayable == form1) {//GEN-BEGIN:MVDCABody
            if (command == component1) {//GEN-END:MVDCABody
                // Insert pre-action code here
                getDisplay().setCurrent(get_form2());//GEN-LINE:MVDCAAction14
                threadShop p = new threadShop();
                p.tf2 = this.textField2;
                p.tf3 = this.textField3;
                p.tf4 = this.textField4;
                p.start();
            } else if (command == okCommand5) {//GEN-LINE:MVDCACase14
                // Insert pre-action code here
                exitMIDlet();//GEN-LINE:MVDCAAction30
                // Insert post-action code here
            }//GEN-BEGIN:MVDCACase30
        } else if (displayable == form2) {
            if (command == okCommand4) {//GEN-END:MVDCACase30
                // Insert pre-action code here
                getDisplay().setCurrent(get_form1());//GEN-LINE:MVDCAAction17
                // Insert post-action code here
            }//GEN-BEGIN:MVDCACase17
        }//GEN-END:MVDCACase17
        // Insert global post-action code here
}//GEN-LINE:MVDCAEnd
    
    /**
     * This method should return an instance of the display.
     */
    public Display getDisplay() {//GEN-FIRST:MVDGetDisplay
        return Display.getDisplay(this);
    }//GEN-LAST:MVDGetDisplay
    
    /**
     * This method should exit the midlet.
     */
    public void exitMIDlet() {//GEN-FIRST:MVDExitMidlet
        getDisplay().setCurrent(null);
        destroyApp(true);
        notifyDestroyed();
    }//GEN-LAST:MVDExitMidlet
    
    
    
    
    /** This method returns instance for form1 component and should be called instead of accessing form1 field directly.//GEN-BEGIN:MVDGetBegin8
     * @return Instance for form1 component
     */
    public Form get_form1() {
        if (form1 == null) {//GEN-END:MVDGetBegin8
            // Insert pre-init code here
            form1 = new Form(null, new Item[] {get_stringItem1()});//GEN-BEGIN:MVDGetInit8
            form1.addCommand(get_component1());
            form1.addCommand(get_okCommand5());
            form1.setCommandListener(this);//GEN-END:MVDGetInit8
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd8
        return form1;
    }//GEN-END:MVDGetEnd8
    
    /** This method returns instance for okCommand1 component and should be called instead of accessing okCommand1 field directly.//GEN-BEGIN:MVDGetBegin9
     * @return Instance for okCommand1 component
     */
    public Command get_okCommand1() {
        if (okCommand1 == null) {//GEN-END:MVDGetBegin9
            // Insert pre-init code here
            okCommand1 = new Command("Ok", Command.OK, 1);//GEN-LINE:MVDGetInit9
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd9
        return okCommand1;
    }//GEN-END:MVDGetEnd9
    
    /** This method returns instance for okCommand2 component and should be called instead of accessing okCommand2 field directly.//GEN-BEGIN:MVDGetBegin10
     * @return Instance for okCommand2 component
     */
    public Command get_okCommand2() {
        if (okCommand2 == null) {//GEN-END:MVDGetBegin10
            // Insert pre-init code here
            okCommand2 = new Command("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438", Command.OK, 1);//GEN-LINE:MVDGetInit10
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd10
        return okCommand2;
    }//GEN-END:MVDGetEnd10
    
    /** This method returns instance for component1 component and should be called instead of accessing component1 field directly.//GEN-BEGIN:MVDGetBegin13
     * @return Instance for component1 component
     */
    public Command get_component1() {
        if (component1 == null) {//GEN-END:MVDGetBegin13
            // Insert pre-init code here
            component1 = new Command("\u0417\u0430\u043A\u0430\u0437\u044B", Command.OK, 1);//GEN-LINE:MVDGetInit13
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd13
        return component1;
    }//GEN-END:MVDGetEnd13
    
    /** This method returns instance for form2 component and should be called instead of accessing form2 field directly.//GEN-BEGIN:MVDGetBegin15
     * @return Instance for form2 component
     */
    public Form get_form2() {
        if (form2 == null) {//GEN-END:MVDGetBegin15
            // Insert pre-init code here
            form2 = new Form(null, new Item[] {//GEN-BEGIN:MVDGetInit15
                get_textField2(),
                get_textField3(),
                get_textField4()
            });
            form2.addCommand(get_okCommand4());
            form2.setCommandListener(this);//GEN-END:MVDGetInit15
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd15
        return form2;
    }//GEN-END:MVDGetEnd15
    
    /** This method returns instance for okCommand4 component and should be called instead of accessing okCommand4 field directly.//GEN-BEGIN:MVDGetBegin16
     * @return Instance for okCommand4 component
     */
    public Command get_okCommand4() {
        if (okCommand4 == null) {//GEN-END:MVDGetBegin16
            // Insert pre-init code here
            okCommand4 = new Command("\u041D\u0430\u0437\u0430\u0434", Command.OK, 1);//GEN-LINE:MVDGetInit16
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd16
        return okCommand4;
    }//GEN-END:MVDGetEnd16
    
    /** This method returns instance for textField2 component and should be called instead of accessing textField2 field directly.//GEN-BEGIN:MVDGetBegin19
     * @return Instance for textField2 component
     */
    public TextField get_textField2() {
        if (textField2 == null) {//GEN-END:MVDGetBegin19
            // Insert pre-init code here
            textField2 = new TextField("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", null, 120, TextField.ANY);//GEN-LINE:MVDGetInit19
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd19
        return textField2;
    }//GEN-END:MVDGetEnd19
        /** This method returns instance for textField3 component and should be called instead of accessing textField3 field directly.//GEN-BEGIN:MVDGetBegin21
     * @return Instance for textField3 component
     */
    public TextField get_textField3() {
        if (textField3 == null) {//GEN-END:MVDGetBegin21
            // Insert pre-init code here
            textField3 = new TextField("\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430", null, 120, TextField.ANY);//GEN-LINE:MVDGetInit21
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd21
        return textField3;
    }//GEN-END:MVDGetEnd21
    
    /** This method returns instance for textField4 component and should be called instead of accessing textField4 field directly.//GEN-BEGIN:MVDGetBegin22
     * @return Instance for textField4 component
     */
    public TextField get_textField4() {
        if (textField4 == null) {//GEN-END:MVDGetBegin22
            // Insert pre-init code here
            textField4 = new TextField("\u0412\u044B\u0440\u0443\u0447\u043A\u0430", null, 120, TextField.ANY);//GEN-LINE:MVDGetInit22
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd22
        return textField4;
    }//GEN-END:MVDGetEnd22
    
    /** This method returns instance for stringItem1 component and should be called instead of accessing stringItem1 field directly.//GEN-BEGIN:MVDGetBegin23
     * @return Instance for stringItem1 component
     */
    public StringItem get_stringItem1() {
        if (stringItem1 == null) {//GEN-END:MVDGetBegin23
            // Insert pre-init code here
            stringItem1 = new StringItem("\n", "\u041C\u0438\u0434\u043B\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430 \u201C\u0421\u0410\u041B\u042E\u0422-\u0410\u0412\u0422\u041E\u201D \u0447\u0435\u0440\u0435\u0437 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441");//GEN-BEGIN:MVDGetInit23
            stringItem1.setFont(get_font1());//GEN-END:MVDGetInit23
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd23
        return stringItem1;
    }//GEN-END:MVDGetEnd23
    
    /** This method returns instance for font1 component and should be called instead of accessing font1 field directly.//GEN-BEGIN:MVDGetBegin24
     * @return Instance for font1 component
     */
    public Font get_font1() {
        if (font1 == null) {//GEN-END:MVDGetBegin24
            // Insert pre-init code here
            font1 = Font.getFont(Font.FACE_SYSTEM, 0x1, Font.SIZE_MEDIUM);//GEN-LINE:MVDGetInit24
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd24
        return font1;
    }//GEN-END:MVDGetEnd24
    
    /** This method returns instance for okCommand3 component and should be called instead of accessing okCommand3 field directly.//GEN-BEGIN:MVDGetBegin27
     * @return Instance for okCommand3 component
     */
    public Command get_okCommand3() {
        if (okCommand3 == null) {//GEN-END:MVDGetBegin27
            // Insert pre-init code here
            okCommand3 = new Command("\u041D\u0430\u0437\u0430\u0434", Command.OK, 1);//GEN-LINE:MVDGetInit27
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd27
        return okCommand3;
    }//GEN-END:MVDGetEnd27
    
    /** This method returns instance for okCommand5 component and should be called instead of accessing okCommand5 field directly.//GEN-BEGIN:MVDGetBegin29
     * @return Instance for okCommand5 component
     */
    public Command get_okCommand5() {
        if (okCommand5 == null) {//GEN-END:MVDGetBegin29
            // Insert pre-init code here
            okCommand5 = new Command("\u0412\u044B\u0445\u043E\u0434", Command.OK, 1);//GEN-LINE:MVDGetInit29
            // Insert post-init code here
        }//GEN-BEGIN:MVDGetEnd29
        return okCommand5;
    }//GEN-END:MVDGetEnd29
    
    public void startApp() {
        initialize();
    }
    
    public void pauseApp() {
    }
    
    public void destroyApp(boolean unconditional) {
    }
    
}
