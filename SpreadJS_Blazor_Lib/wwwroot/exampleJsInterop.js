window.sjsAdaptor = {
    init: function (host, config) {
        // ライセンスキーがある場合は設定します。
        //GC.Spread.Sheets.LicenseKey = "";
        if (config.hostStyle) {
            var hostStyle = config.hostStyle;
            var styles = hostStyle.split(';');
            styles.forEach((styleStr) => {
                var style = styleStr.split(':');
                host.style[style[0]] = style[1];
            });
            delete config.hostStyle;
        }

        return new GC.Spread.Sheets.Workbook(host, config);
    },

    setCulture: function (locale) {
        GC.Spread.Common.CultureManager.culture(locale);
    },

    setValue: function (host, sheetIndex, row, col, value) {
        var spread = GC.Spread.Sheets.findControl(host);
        if (spread) {
            var sheet = spread.getSheet(sheetIndex);
            sheet.setValue(row, col, value);
        }
    },

    openExcel: function (host, inputFile) {
        var spread = GC.Spread.Sheets.findControl(host);
        if (spread) {
            var excelIO = new GC.Spread.Excel.IO();
            excelIO.open(inputFile.files[0], function (json) {
                spread.fromJSON(json);
            })
        }
    }
};