package com.ocs;

import com.facebook.react.ReactActivity;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class MainActivity extends ReactActivity {
//   public void logSentFriendRequestEvent () {
//     logger.logEvent("sentFriendRequest");
// }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ocs";
  }
  
}
