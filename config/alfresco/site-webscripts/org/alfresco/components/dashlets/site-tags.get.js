const PREFERENCES_ROOT = "org.alfresco.share.dashlet";

function main()
{
   var s = new XML(config.script);
   model.maxItems = parseInt(s.maxItems, 10);
   model.minFontSize = parseFloat(s.minFontSize, 1.0);
   model.maxFontSize = parseFloat(s.maxFontSize, 3.0);
   model.fontSizeUnits = s.fontSizeUnits.toString();

   var result, preferences = {};
   
   // Request the current user's preferences
   var result = remote.call("/api/people/" + stringUtils.urlEncode(user.name) + "/preferences?pf=" + PREFERENCES_ROOT);
   if (result.status == 200 && result != "{}")
   {
      var prefs = eval('(' + result + ')');
      try
      {
         // Populate the preferences object literal for easy look-up later
         preferences = eval('(prefs.' + PREFERENCES_ROOT + ')');
         if (typeof preferences != "object")
         {
            preferences = {};
         }
      }
      catch (e)
      {
      }
   }

   model.preferences = preferences;
}

main();