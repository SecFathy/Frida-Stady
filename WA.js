/*
SecFathy
*/
Java.perform(function() {
const interceptedTables = ["message", "message_ftsv2"];
    const keysToSearch = ["text_data", "content"];
    const stringToAdded = "Fathy";
    /**
        * @param {android.content.ContentValues} paramObject data to be inserted
    */
    function getMessageContentFun(paramObject) {
        var originalData = null;
        var selectedKey = null;
        for (var paramIndexer = 0; paramIndexer < keysToSearch.length; paramIndexer++) {
            var tempValue = keysToSearch[paramIndexer];
            if (paramObject.containsKey(tempValue)) {
                try {
                    originalData = paramObject.get(tempValue).toString();
                    selectedKey = tempValue;
                    break;
                } catch (err) {
                    console.log(paramObject);
                    originalData = null;
                    selectedKey = null;
                } 
            }
        }
            if (selectedKey != null && originalData != null && !originalData.includes(stringToAdded)) {
                paramObject.put(selectedKey, originalData + " With " + stringToAdded);
        }
    };
    setImmediate(function() {
        Java.perform(function() {
            var sqliteDatabase = Java.use("android.database.sqlite.SQLiteDatabase");
            // insert(String table, String nullColumnHack, ContentValues values)
            sqliteDatabase.insert.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues').implementation = function(var0, var1, var2) {
                if (interceptedTables.indexOf(var0) != -1) {
                    getMessageContentFun(var2);
                }
                var insertValueRes = this.insert(var0, var1, var2);
                return insertValueRes;
            };
            // insertOrThrow(String table, String nullColumnHack, ContentValues values)
            sqliteDatabase.insertOrThrow.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues').implementation = function(var0, var1, var2) {
                if (interceptedTables.indexOf(var0) != -1) {
                    getMessageContentFun(var2);
                }
                var insertValueRes = this.insertOrThrow(var0, var1, var2);
                return insertValueRes;
            };
            // insertWithOnConflict(String table, String nullColumnHack, ContentValues initialValues, int conflictAlgorithm)
            sqliteDatabase.insertWithOnConflict.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues', 'int').implementation = function(var0, var1, var2, var3) {
                if (interceptedTables.indexOf(var0) != -1) {
                    getMessageContentFun(var2);
                }
                var insertValueRes = this.insertWithOnConflict(var0, var1, var2, var3);
                return insertValueRes;
            };
        });
    });
});