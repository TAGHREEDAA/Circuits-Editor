


//document.writeln("<script src='svg.js'><\/script>");
var draw;
var rect;
function initializeSVG(str, width, height)
{
    draw = SVG(str).size(width, height);
    //By default sub pixel offset won't be corrected.
    //To enable it, call the fixSubPixelOffset() method:
    //var draw = SVG('dd').fixSubPixelOffset()
}


SVG.Wire = SVG.invent({
    create: function (x1, y1, x2, y2, clr) {
        this.constructor.call(this, SVG.create('g'));
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));

        var rect = draw.rect(L, 20).move(x1, y1 - 10).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
        var line = draw.line(x1, y1, x2, y2).stroke({ color: clr, width: 1 });
        var StartCircle = draw.circle(7).center(x1, y1).stroke({ color: '#000', width: 0.0 }).fill({ color: 'none' });
        var EndCircle = draw.circle(7).center(x2, y2).stroke({ color: '#000', width: 0.0 }).fill({ color: 'none' });;

        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(line);
    }
            , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        Wire: function (x1, y1, x2, y2,clr) {
            return this.put(new SVG.Wire(x1, y1, x2, y2,clr))
        }
    }
});

SVG.extend(SVG.Wire, {
    GenerateXML: function () {
          
        var str = '<connector name="' + this.attr('ElementID') + '"> \n <node row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></node> \n <node row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></node> \n </connector>'

        return str;
    }
});


/////// ------------ Draw  Resitor  ---------------- ////////
SVG.Resistor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        // draw.clear()
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 3;
        var polyline;
        var P1x = x1;
        var P1y = y1 - Y / 2;
        var P2x;
        var P2y = y1 + Y / 2;
        var StartCircle;
        var EndCircle;
        //var rect;
        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2)
        {
            rect = draw.rect(L, delta).move(x1 - L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline = draw.polyline([[x1, y1], [x1 - delta, y1], [x1 - delta - delta / 10, y1 - delta / 4], [x1 - delta - 3 * delta / 10, y1 + delta / 4], [x1 - delta - 5 * delta / 10, y1 - delta / 4], [x1 - delta - 7 * delta / 10, y1 + delta / 4], [x1 - delta - 9 * delta / 10, y1 - delta / 4], [x1 - 2 * delta, y1], [x1 - L, y1]]).fill('none').stroke({ width: 1 });
        }
        else
        {
            rect = draw.rect(L, delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline = draw.polyline([[x1, y1], [x1 + delta, y1], [x1 + delta + delta / 10, y1 - delta / 4], [x1 + delta + 3 * delta / 10, y1 + delta / 4], [x1 + delta + 5 * delta / 10, y1 - delta / 4], [x1 + delta + 7 * delta / 10, y1 + delta / 4], [x1 + delta + 9 * delta / 10, y1 - delta / 4], [x1 + 2 * delta, y1], [x1 + L, y1]]).fill('none').stroke({ width: 1 });
        }

        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);

        this.add(polyline);
        this.transform({ rotation: angle, cx: x1, cy: y1 })

    }
        , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        Resistor: function (x1, y1, x2, y2) {
        return this.put(new SVG.Resistor(x1, y1, x2, y2))
        }
    }



});

SVG.extend(SVG.Resistor, {
    GenerateXML: function () {
        //var str = '<r type="Constant" name="' + this.attr('ElementID') + '"> \n <node row="' + this.attr("StartPointX") + '" col="' + this.attr("StartPointY") + '"></node> \n <node row="' + this.attr("EndPointX") + '" col="' + this.attr("EndPointY") + '"></node> \n </r>'
        var str = '<r type="Constant" name="' + this.attr('ElementID') + '"> \n <node row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></node> \n <node row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></node> \n </r>'
        return str;
    }
});


/////// ------------ Draw Var Resitor  ---------------- ////////
SVG.VarResistor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        //draw.clear()
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 3;
        var resistor;
        var line1;
        var rect;
        var StartCircle;
        var EndCircle;
        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2)
        {
            rect = draw.rect(L, 1.5*delta).move(x1 - L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            resistor = draw.Resistor(x1, y1, x1 - L, y1);
            line1 = draw.Arrow(x1 - delta, y1 + delta / 2, x1 - L + 1.25 * delta, y1 - 0.75 * delta);
        }
        else
        {
            rect = draw.rect(L, 1.5*delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            resistor = draw.Resistor(x1, y1, x1 + L, y1);
            line1 = draw.Arrow(x1 + delta, y1 + delta / 2, x1 + 1.75 * delta, y1 - 0.75 * delta);
        }
        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(resistor);
        this.add(line1);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
            , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        VarResistor: function (x1, y1, x2, y2) {
            return this.put(new SVG.VarResistor(x1, y1, x2, y2))
        }
    }
});

SVG.extend(SVG.VarResistor, {
    GenerateXML: function () {
        var str = '<r type="Variable" name="' + this.attr('ElementID') + '"> \n <node row="' + (this.attr("StartPointY")/scale) + '" col="' + (this.attr("StartPointX")/scale) + '"></node> \n <node row="' + (this.attr("EndPointY")/scale) + '" col="' + (this.attr("EndPointX")/scale) + '"></node> \n </r>';
        return str;
    }
});



/////// ------------ Draw Capacitor  ---------------- ////////
SVG.Capacitor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 10;
        var polyline1;
        var polyline2;
        var rect;
        var StartCircle;
        var EndCircle;

        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2)
        {
            rect = draw.rect(L, 3*delta).move(x1 - L, y1 - 1.5*delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline1 = draw.polyline([[x1, y1], [x1 - 4.5 * delta, y1], [x1 - 4.5 * delta, y1 - 1.5 * delta], [x1 - 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });
            polyline2 = draw.polyline([[x1 - L, y1], [x1 - L + 4.5 * delta, y1], [x1 - L + 4.5 * delta, y1 - 1.5 * delta], [x1 - L + 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });

        }
        else
        {
            rect = draw.rect(L, 3*delta).move(x1, y1 - 1.5*delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline1 = draw.polyline([[x1, y1], [x1 + 4.5 * delta, y1], [x1 + 4.5 * delta, y1 - 1.5 * delta], [x1 + 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });
            polyline2 = draw.polyline([[x1 + L, y1], [x1 + L - 4.5 * delta, y1], [x1 + L - 4.5 * delta, y1 - 1.5 * delta], [x1 + L - 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });
        }

        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(polyline1);
        this.add(polyline2);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
        , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        Capacitor: function (x1, y1, x2, y2) {
            return this.put(new SVG.Capacitor(x1, y1, x2, y2))
        }
    }
});


SVG.extend(SVG.Capacitor, {
    GenerateXML: function () {
        var str = '<c type="Chemical" name="' + this.attr('ElementID') + '"> \n <pins> \n <cathode row="' + (this.attr("StartPointY")/scale) + '" col="' + (this.attr("StartPointX")/scale) + '"></cathode> \n <anode row="' + (this.attr("EndPointY")/scale) + '" col="' + (this.attr("EndPointX")/scale) + '"></anode> \n </pins> \n </c>';
        return str;
    }
});




SVG.VarCapacitor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        // draw.clear()
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 10;
        var capacitor;
        var arrow;
        var rect;
        var StartCircle;
        var EndCircle;
        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2)
        {
            rect = draw.rect(L, 3*delta).move(x1-L, y1 - 1.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            capacitor = draw.Capacitor(x1, y1, x1 - L, y1);
            arrow = draw.Arrow(x1 - 2 * delta, y1 + 2 * delta, x1 - L + 2 * delta, y1 - 2 * delta);
        }
        else {
            rect = draw.rect(L, 3*delta).move(x1, y1 - 1.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            capacitor = draw.Capacitor(x1, y1, x1 + L, y1);
            arrow = draw.Arrow(x1 + L - 2 * delta, y1 + 2 * delta, x1 + 2 * delta, y1 - 2 * delta);
        }
        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(capacitor);
        this.add(arrow);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
            , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        VarCapacitor: function (x1, y1, x2, y2) {
            return this.put(new SVG.VarCapacitor(x1, y1, x2, y2))
        }
    }
});

SVG.extend(SVG.VarCapacitor, {
    GenerateXML: function () {
        var str = '<c type="VariableChemical" name="' + this.attr('ElementID') + '"> \n <pins> \n <cathode row="' + (this.attr("StartPointY")/scale) + '" col="' + (this.attr("StartPointX")/scale) + '"></cathode> \n <anode row="' + (this.attr("EndPointY")/scale) + '" col="' + (this.attr("EndPointX")/scale) + '"></anode> \n </pins> \n </c>';
        return str;
    }
});


/////// ------------ Draw Polarized Capacitor  ---------------- ////////
SVG.PolarizedCapacitor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 10;
        var polyline1;
        var line;
        var curve;
        var positive;
        var rect;
        var StartCircle;
        var EndCircle;
        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2)
        {
            rect = draw.rect(L, 3.5 * delta).move(x1 - L, y1 - 1.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline1 = draw.polyline([[x1, y1], [x1 - 4.5 * delta, y1], [x1 - 4.5 * delta, y1 - 1.5 * delta], [x1 - 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });
            line = draw.line(x1 - L, y1, x1 - L + 5 * delta, y1).stroke({ width: 1 });
            curve = draw.path("M" + (x1 - L + 4.5 * delta) + "," + (y1 - 1.5 * delta) + " Q" + (x1 - L + 5.5 * delta) + "," + y1 + " " + (x1 - L + 4.5 * delta) + "," + (y1 + 1.5 * delta)).stroke({ width: 1 }).attr({ fill: 'none' });
            positive = draw.positive(x1 - 3.7 * delta, y1 + 1.3 * delta, 0.4 * delta);
        }
        else
        {
            rect = draw.rect(L, 3.5 * delta).move(x1, y1 - 1.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            polyline1 = draw.polyline([[x1, y1], [x1 + 4.5 * delta, y1], [x1 + 4.5 * delta, y1 - 1.5 * delta], [x1 + 4.5 * delta, y1 + 1.5 * delta]]).fill('none').stroke({ width: 1 });
            line = draw.line(x1 + L, y1, x1 + L - 5 * delta, y1).stroke({ width: 1 });
            curve = draw.path("M" + (x1 + L - 4.5 * delta) + "," + (y1 - 1.5 * delta) + " Q" + (x1 + L - 5.5 * delta) + "," + y1 + " " + (x1 + L - 4.5 * delta) + "," + (y1 + 1.5 * delta)).stroke({ width: 1 }).attr({ fill: 'none' });
            positive = draw.positive(x1 + 3.7 * delta, y1 + 1.3 * delta, 0.4 * delta);
        }

        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(polyline1);
        this.add(line);
        this.add(curve);
        this.add(positive);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
            , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        PolarizedCapacitor: function (x1, y1, x2, y2) {
            return this.put(new SVG.PolarizedCapacitor(x1, y1, x2, y2))
        }
    }
});

SVG.extend(SVG.PolarizedCapacitor, {
    GenerateXML: function () {
        var str = '<c type="Bipolar" name="' + this.attr('ElementID') + '"> \n <pins> \n <cathode row="' + (this.attr("StartPointY")/scale) + '" col="' + (this.attr("StartPointX")/scale) + '"></cathode> \n <anode row="' + (this.attr("EndPointY")/scale) + '" col="' + (this.attr("EndPointX")/scale) + '"></anode> \n </pins> \n </c>';
        return str;
    }
});




////-------------------------- Variable Polrized Capacitor-----------------------//
SVG.VarPolarizedCapacitor = SVG.invent({
    create: function (x1, y1, x2, y2) {
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 10;
        var PCapacitor;
        var arrow;
        var rect;
        var StartCircle;
        var EndCircle;

        this.constructor.call(this, SVG.create('g'));
        if (x1 > x2) {
            rect = draw.rect(L, 4 * delta).move(x1, y1 - 2 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            PCapacitor = draw.PolarizedCapacitor(x1, y1, x1 - L, y1);
            arrow = draw.Arrow(x1 - 2 * delta, y1 + 2 * delta, x1 - L + 2 * delta, y1 - 2 * delta);

        }
        else {
            rect = draw.rect(L, 4 * delta).move(x1, y1 - 2 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            PCapacitor = draw.PolarizedCapacitor(x1, y1, x1 + L, y1);
            arrow = draw.Arrow(x1 + L - 2 * delta, y1 + 2 * delta, x1 + 2 * delta, y1 - 2 * delta);

        }
        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(PCapacitor);
        this.add(arrow);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
                , inherit: SVG.G

    // define how this newly invented element is created
    , construct: {
        VarPolarizedCapacitor: function (x1, y1, x2, y2) {
            return this.put(new SVG.VarPolarizedCapacitor(x1, y1, x2, y2))
        }
    }
});

SVG.extend(SVG.VarPolarizedCapacitor, {
    GenerateXML: function () {
        var str = '<c type="VariableBipolar" name="' + this.attr('ElementID') + '"> \n <pins> \n <cathode row="' + (this.attr("StartPointY")/scale) + '" col="' + (this.attr("StartPointX")/scale) + '"></cathode> \n <anode row="' + (this.attr("EndPointY")/scale) + '" col="' + (this.attr("EndPointX")/scale) + '"></anode> \n </pins> \n </c>';
        return str;
    }
});



/////// ------------ Draw Arrow At Any Direction  ---------------- ////////
SVG.Arrow = SVG.invent({
    create: function (x1, y1, x2, y2) {
        //draw.clear();
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 4
        var line1
        var line2
        var line3
        var rect;
        this.constructor.call(this, SVG.create('g'));
        if (x2 < x1) {
            rect = draw.rect(L, 1.4 * delta).move(x1 - L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            line1 = draw.line(x1, y1, x1 - L, y1).stroke({ width: 1 })
            line2 = draw.line(x1 - L, y1, x1 - L + delta, y1 - delta / 2).stroke({ width: 1 });
            line3 = draw.line(x1 - L, y1, x1 - L + delta, y1 + delta / 2).stroke({ width: 1 });
        }
        else {
            rect = draw.rect(L, 1.4 * delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            line1 = draw.line(x1, y1, x1 + L, y1).stroke({ width: 1 })
            line2 = draw.line(x1 + L, y1, x1 + L - delta, y1 - delta / 2).stroke({ width: 1 });
            line3 = draw.line(x1 + L, y1, x1 + L - delta, y1 + delta / 2).stroke({ width: 1 });
        }
        this.add(rect);
        this.add(line1);
        this.add(line2);
        this.add(line3);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
    }
        , inherit: SVG.G


        , construct: {
            Arrow: function (x1, y1, x2, y2) {
                return this.put(new SVG.Arrow(x1, y1, x2, y2))
            }
        }

});



////////////////////////////////////////draw Positive///////////////////////////////////////
SVG.positive = SVG.invent({
    create: function (x1, y1, radius)
    {
        //var group = draw.group()
        this.constructor.call(this, SVG.create('g'));
        var line1 = draw.line(x1, y1 - radius, x1, y1 + radius).stroke({ width: 1.5, color: 'red' })
        var line2 = draw.line(x1 - radius, y1, x1 + radius, y1).stroke({ width: 1.5, color: 'red' })
        this.add(line1);
        this.add(line2);
        //return group;

    }
    , inherit: SVG.G


        , construct: {
            positive: function (x1, y1, radius) {
                return this.put(new SVG.positive(x1, y1, radius))
            }
        }
});


/////////////////////////////////////draw Negative/////////////////////////
SVG.negative = SVG.invent({
    create: function (x1, y1, radius, direction) {
        //var group = draw.group()
        var line;
        this.constructor.call(this, SVG.create('g'));
        if (direction == "Vertical") {
            line = draw.line(x1, y1 - radius, x1, y1 + radius).stroke({ width: 1.5, color: 'red' });
        }
        else {
            line = draw.line(x1 - radius, y1, x1 + radius, y1).stroke({ width: 1.5, color: 'red' });
        }
        this.add(line);
        //return group
    }
        , inherit: SVG.G


        , construct: {
            negative: function (x1, y1, radius, direction) {
                return this.put(new SVG.negative(x1, y1, radius, direction))
            }
        }
});


//////////////////////////////////////draw Triangle//////////////////////////////
SVG.triangle = SVG.invent({
    create: function (x1, y1, x2, y2, clr) {
        var X = x2 - x1;
        var delta = X / 3;
        this.constructor.call(this, SVG.create('g'));

        var line = draw.line(x1, y1, x1 + delta, y1).stroke({ width: 1 })
        var line2 = draw.line(x2 - delta, y2, x2, y2).stroke({ width: 1 })
        var polyline = draw.polyline([[x1 + delta, y1 + delta / 2], [x1 + delta, y1 - delta / 2], [x2 - delta, y2], [x1 + delta, y1 + delta / 2]]).fill(clr).stroke({ width: 1 })
        //var group = draw.group()
        this.add(line);
        this.add(line2);
        this.add(polyline);
    }
        , inherit: SVG.G


        , construct: {
            triangle: function (x1, y1, x2, y2, clr) {
                return this.put(new SVG.triangle(x1, y1, x2, y2, clr))
            }
        }
});





SVG.Not = SVG.invent({
    create:function (x1, y1, x2, y2) {
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var anglerad = Math.atan(Y / X)
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var ll
        var group
        var circle
        var delta = L / 3;
        var rect;
        this.constructor.call(this, SVG.create('g'));
        if (x2 < x1) {
            //group = drawTriangle(x1, y1, x1 - L, y1, 'none')
            rect = draw.rect(L, delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            group = draw.triangle(x1, y1, x1 - L, y1, 'none')
            circle = draw.circle(delta / 8).center(x1 - L + delta - (delta / 14), y1).fill('white').stroke({ color: '#000', width: 0.5 })
        }
        else 
        {
            //group = drawTriangle(x1, y1, x1 + L, y1, 'none')
            rect = draw.rect(L,delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            group = draw.triangle(x1, y1, x1 + L, y1, 'none')
            circle = draw.circle(delta / 8).center(x1 + L - delta + (delta / 14), y1).fill('white').stroke({ color: '#000', width: 0.5 })
        }
        this.add(rect);
        this.add(group);
        this.add(circle);
        this.transform({ rotation: angle, cx: x1, cy: y1 })


    }
            , inherit: SVG.G


        , construct: {
            Not: function (x1, y1, x2, y2) {
                return this.put(new SVG.Not(x1, y1, x2, y2))
            }
        }

});



    function drawGrid(x1, y1, width, height, space)
    {
        //draw.clear();
        for (var j = 0; y1 + j * space <= y1 + height ; j++) {
            draw.line(x1, y1 + j * space, x1 + width, y1 + j * space).stroke({ color: 'gray', width: 0.5 })
        }
        for (var i = 0; x1 + i * space <= x1+width ; i++) {
            draw.line(x1 + i * space, y1, x1 + i * space, y1 + height).stroke({ color: 'gray', width: 0.5 })
        }
    }


    function drawNewCustomGrid(x1, y1, width, height, space) {
        //draw.clear();
        for (var j = 0; y1 + j * space <= y1 + height ; j++) {
            draw.line(x1, y1 + j * space, x1 + width, y1 + j * space).stroke({ color: 'gray', width: 0.5 })
        }
        for (var i = 0; x1 + i * space <= x1 + width ; i++) {
            draw.line(x1 + i * space, y1, x1 + i * space, y1 + height).stroke({ color: 'gray', width: 0.5 })
        }
    }


/////// ------------ Draw Not filled Diode At Any Direction  ---------------- ////////
    SVG.Diode = SVG.invent({
   create: function (x1, y1, x2, y2, clr) {
        //draw.clear();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var group;
        var delta = L / 3;
        var Diodeline;
        //var rect;
        this.constructor.call(this, SVG.create('g'));

        if (x2 < x1)
        {
            rect = draw.rect(L, delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            group = draw.triangle(x1, y1, x1 - L, y1, clr);
            Diodeline = draw.line(x1 - L + delta, y1 + delta / 2, x1 - L + delta, y1 - delta / 2).stroke({ width: 1 })

        }
        else
        {
            rect = draw.rect(L, delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            group = draw.triangle(x1, y1, x1 + L, y1, clr)
            Diodeline = draw.line(x1 + L - delta, y1 + delta / 2, x1 + L - delta, y1 - delta / 2).stroke({ width: 1 })
        }
        this.add(rect);
        this.add(group);
        this.add(Diodeline);
        this.transform({ rotation: angle, cx: x1, cy: y1 })

        //// The blue Line acts as correct reference between the two points entered by user
        //var blueLine = draw.line(x1, y1, x2, y2).stroke({ color: 'blue', width: 1 })
   }
                    , inherit: SVG.G


        , construct: {
            Diode: function (x1, y1, x2, y2, clr) {
                return this.put(new SVG.Diode(x1, y1, x2, y2, clr))
            }
        }
    });



/////// ------------ Draw Black PIN Diode At Any Direction  ---------------- ////////
    SVG.PINdiode = SVG.invent({
        create: function (x1, y1, x2, y2) {
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var group;
            var delta = L / 3;
            var group;
            var StartCircle;
            var EndCircle;

            this.constructor.call(this, SVG.create('g'));
            //draw.clear();
            if (x2<x1)
            {
                rect = draw.rect(L, delta).move(x1 - L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            }
            group = draw.Diode(x1, y1, x2, y2, 'black');
            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
        }
        , inherit: SVG.G


        , construct: {
            PINdiode: function (x1, y1, x2, y2) {
                return this.put(new SVG.PINdiode(x1, y1, x2, y2))
            }
        }
    });

    SVG.extend(SVG.PINdiode, {
        GenerateXML: function () {
            var str = '<diode type="PINDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'

            return str;
        }
    });


/////// ------------ Draw Colored LED At Any Direction  ---------------- ////////
    SVG.LED = SVG.invent({
        create: function (x1, y1, x2, y2, clr) {
            // draw.clear();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var delta = L / 3;
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var circle;
            var arrow1;
            var arrow2;
            var StartCircle;
            var EndCircle;         
            this.constructor.call(this, SVG.create('g'));
            var group = draw.Diode(x1, y1, x2, y2, clr);
            var rect;
            if (x2 < x1) {

                rect = draw.rect(L, 1.5*delta).move(x1-L, y1 - 0.75*delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                circle = draw.circle(1.45 * delta).center(x1 - L / 2, y1).fill('none').stroke({ color: '#000', width: 0.5 })
                arrow1 = draw.Arrow(x1 - L + (2 * delta / 3), y1 + (delta / 6), x1 - L + (delta / 3), y1 + (2 * delta / 6))
                arrow2 = draw.Arrow(x1 - L + (2 * delta / 3), y1 + (2 * delta / 6), x1 - L + (delta / 3), y1 + (3 * delta / 6))

            }
            else
            {
                rect = draw.rect(L, 1.5*delta).move(x1, y1 - 0.75*delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                circle = draw.circle(1.45 * delta).center(x1 + L / 2, y1).fill('none').stroke({ color: '#000', width: 0.5 })
                arrow1 = draw.Arrow(x1 + L - (2 * delta / 3), y1 - (delta / 6), x1 + L - (delta / 3), y1 - (2 * delta / 6))
                arrow2 = draw.Arrow(x1 + L - (2 * delta / 3), y1 - (2 * delta / 6), x1 + L - (delta / 3), y1 - (3 * delta / 6))
            }
            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(circle);
            this.add(arrow1);
            this.add(arrow2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
                , inherit: SVG.G


        , construct: {
            LED: function (x1, y1, x2, y2,clr) {
                return this.put(new SVG.LED(x1, y1, x2, y2,clr))
            }
        }
    });
    SVG.extend(SVG.LED, {
        GenerateXML: function () {
            var str = '<led name="' + this.attr('ElementID') + '"> \n <positive  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></positive> \n <negative row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></negative> \n </led>'

            return str;
        }
    });

/////// ------------ Draw Colored PhotoDiode At Any Direction  ---------------- ////////
    SVG.PhotoDiode = SVG.invent({
        create: function (x1, y1, x2, y2, clr) {
            // draw.clear();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var delta = L / 3;
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var circle;
            var arrow1;
            var arrow2;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));
            var group = draw.Diode(x1, y1, x2, y2, clr);

            if (x2 < x1) {

                rect = draw.rect(L, 1.5 * delta).move(x1-L, y1 - 0.75 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                circle = draw.circle(1.45 * delta).center(x1 - L / 2, y1).fill('none').stroke({ color: '#000', width: 0.5 })
                arrow1 = draw.Arrow(x1 - L + (delta / 3), y1 + (2 * delta / 6), x1 - L + (2 * delta / 3), y1 + (delta / 6))
                arrow2 = draw.Arrow(x1 - L + (delta / 3), y1 + (3 * delta / 6), x1 - L + (2 * delta / 3), y1 + (2 * delta / 6))

            }
            else {
                rect = draw.rect(L, 1.5 * delta).move(x1, y1 - 0.75 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                circle = draw.circle(1.45 * delta).center(x1 + L / 2, y1).fill('none').stroke({ color: '#000', width: 0.5 })
                arrow1 = draw.Arrow(x1 + L - (delta / 3), y1 - (2 * delta / 6), x1 + L - (2 * delta / 3), y1 - (delta / 6))
                arrow2 = draw.Arrow(x1 + L - (delta / 3), y1 - (3 * delta / 6), x1 + L - (2 * delta / 3), y1 - (2 * delta / 6))
            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(circle);
            this.add(arrow1);
            this.add(arrow2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
        , inherit: SVG.G
        , construct: {
            PhotoDiode: function (x1, y1, x2, y2, clr) {
                return this.put(new SVG.PhotoDiode(x1, y1, x2, y2, clr))
            }
        }
    });

    SVG.extend(SVG.PhotoDiode, {
        GenerateXML: function () {
            var str = '<diode type="PhotoDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'

            return str;
        }
    });


/////// ------------ Draw Black Varactor Diode At Any Direction  ---------------- ////////
    SVG.VaractorDiode = SVG.invent({
        create: function (x1, y1, x2, y2)
        {
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var group;
            var line1
            var line2
            var vline1
            var vline2
            var polyline
            var delta = L / 3;
            var rect;
            var StartCircle;
            var EndCircle;
            var group = draw.group();
            this.constructor.call(this, SVG.create('g'));
            if (x2 < x1) {
                rect = draw.rect(L,delta).move(x1-L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 - delta, y1).stroke({ width: 1 })
                vline1 = draw.line(x1 - L + delta, y1 + delta / 2, x1 - L + delta, y1 - delta / 2).stroke({ width: 1 })
                vline2 = draw.line(x1 - L + delta - (delta / 6), y1 + delta / 2, x1 - L + delta - (delta / 6), y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 - L + delta - (delta / 6), y1, x1 - L, y1).stroke({ width: 1 })
                polyline = draw.polyline([[x1 - delta, y1 + delta / 2], [x1 - delta, y1 - delta / 2], [x1 - L + delta, y1], [x1 - delta, y1 + delta / 2]]).fill('black').stroke({ width: 1 })

            }
            else {
                rect = draw.rect(L,delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 + delta, y1).stroke({ width: 1 })
                vline1 = draw.line(x1 + L - delta, y1 + delta / 2, x1 + L - delta, y1 - delta / 2).stroke({ width: 1 })
                vline2 = draw.line(x1 + L - delta + (delta / 6), y1 + delta / 2, x1 + L - delta + (delta / 6), y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 + L - delta + (delta / 6), y1, x1 + L, y1).stroke({ width: 1 })
                polyline = draw.polyline([[x1 + delta, y1 + delta / 2], [x1 + delta, y1 - delta / 2], [x1 + L - delta, y1], [x1 + delta, y1 + delta / 2]]).fill('black').stroke({ width: 1 })

            }
            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(line1);
            this.add(line2);
            this.add(vline1);
            this.add(vline2);
            this.add(polyline);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
            , inherit: SVG.G
            , construct: {
                VaractorDiode: function (x1, y1, x2, y2, clr) {
                    return this.put(new SVG.VaractorDiode(x1, y1, x2, y2, clr))
            }
        }
    });
    SVG.extend(SVG.VaractorDiode, {
        GenerateXML: function () {
            var str = '<diode type="VaractorDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'

            return str;
        }
    });

/////// ------------ Draw Black Tunnel Diode At Any Direction  ---------------- ////////
    SVG.TunnelDiode = SVG.invent({
        create: function (x1, y1, x2, y2) {
            //draw.clear();
            var group
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line1;
            var line2;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));
            if (x2 < x1)
            {
                rect = draw.rect(L, delta).move(x1 - L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 - L, y1, 'black')
                line1 = draw.line(x1 - L + delta, y1 - delta / 2, x1 - L + delta + delta / 6, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 - L + delta, y1 + delta / 2, x1 - L + delta + delta / 6, y1 + delta / 2).stroke({ width: 1 })

            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 + L, y1, 'black')
                line1 = draw.line(x1 + L - delta, y1 - delta / 2, x1 + L - delta - delta / 6, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 + L - delta, y1 + delta / 2, x1 + L - delta - delta / 6, y1 + delta / 2).stroke({ width: 1 })

            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(line1);
            this.add(line2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
            , inherit: SVG.G
            , construct: {
                TunnelDiode: function (x1, y1, x2, y2, clr) {
                    return this.put(new SVG.TunnelDiode(x1, y1, x2, y2, clr))
                }
            }
    });
    SVG.extend(SVG.TunnelDiode, {
        GenerateXML: function () {
            var str = '<diode type="TunnelDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'

            return str;
        }
    });

/////// ------------ Draw Black Schotty Diode At Any Direction  ---------------- ////////
    SVG.SchottyDiode = SVG.invent({
        create: function drawSchottyDiode(x1, y1, x2, y2)
        {
            var X = x2 - x1;
            var delta = X / 3;
            var group
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line1;
            var line2;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));

            if (x2 < x1)
            {
                rect = draw.rect(L, delta).move(x1-L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 - L, y1, 'black')
                line1 = draw.line(x1 - L + delta, y1 - delta / 2, x1 - L + delta - delta / 6, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 - L + delta, y1 + delta / 2, x1 - L + delta + delta / 6, y1 + delta / 2).stroke({ width: 1 })

            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 + L, y1, 'black')
                line1 = draw.line(x1 + L - delta, y1 - delta / 2, x1 + L - delta + delta / 6, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 + L - delta, y1 + delta / 2, x1 + L - delta - delta / 6, y1 + delta / 2).stroke({ width: 1 })

            }
            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(line1);
            this.add(line2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
                    , inherit: SVG.G
            , construct: {
                SchottyDiode: function (x1, y1, x2, y2) {
                    return this.put(new SVG.SchottyDiode(x1, y1, x2, y2))
                }
            }
    });

    SVG.extend(SVG.SchottyDiode,
        {
        GenerateXML: function ()
            {
            var str = '<diode type="SchottyDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'
                return str;
            }
    });


/////// ------------ Draw Black Constant Current Diode At Any Direction  ---------------- ////////
    SVG.ConstCurrentDiode = SVG.invent({
        create: function (x1, y1, x2, y2) {
            var group
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line1;
            var line2;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));

            if (x2 < x1)
            {
                rect = draw.rect(L, delta).move(x1-L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 - L, y1, 'black')
                line1 = draw.line(x1 - L + delta + delta / 12, y1 - delta / 2, x1 - L + delta - delta / 12, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 - L + delta + delta / 12, y1 + delta / 2, x1 - L + delta - delta / 12, y1 + delta / 2).stroke({ width: 1 })

            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                group = draw.Diode(x1, y1, x1 + L, y1, 'black')
                line1 = draw.line(x1 + L - delta - delta / 12, y1 - delta / 2, x1 + L - delta + delta / 12, y1 - delta / 2).stroke({ width: 1 })
                line2 = draw.line(x1 + L - delta - delta / 12, y1 + delta / 2, x1 + L - delta + delta / 12, y1 + delta / 2).stroke({ width: 1 })

            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(group);
            this.add(line1);
            this.add(line2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
            , inherit: SVG.G
            , construct: {
                ConstCurrentDiode: function (x1, y1, x2, y2) {
                    return this.put(new SVG.ConstCurrentDiode(x1, y1, x2, y2))
                }
            }
    });
    SVG.extend(SVG.ConstCurrentDiode, {
        GenerateXML: function () {
            var str = '<diode type="ConstatntCurrentDiode" name="' + this.attr('ElementID') + '"> \n <anode  row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></anode> \n <cathode row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></cathode> \n </diode>'

            return str;
        }
    });



/////// ------------ Draw DC Voltage Source At Any Direction  ---------------- ////////
    SVG.DCVoltageSource = SVG.invent({
        create: function (x1, y1, x2, y2) {
            // draw.clear()    
            var group = draw.group();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line1;
            var line2;
            var line3;
            var line4;
            var line5;
            var line6;
            var positive;
            var negative;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));

            if (x2 < x1)
            {
                rect = draw.rect(L, 1.375 * delta).move(x1 - L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 - delta, y1).stroke({ width: 1 });
                line2 = draw.line(x1 - delta, y1 + delta / 2, x1 - delta, y1 - delta / 2).stroke({ width: 1 })
                line3 = draw.line(x1 - 1.5 * delta, y1 + delta / 2, x1 - 1.5 * delta, y1 - delta / 2).stroke({ width: 1 })
                line4 = draw.line(x1 - L + 1.25 * delta, y1, x1 - L, y1).stroke({ width: 1 })
                line5 = draw.line(x1 - 1.25 * delta, y1 + delta / 6, x1 - 1.25 * delta, y1 - delta / 6).stroke({ width: 1 })
                line6 = draw.line(x1 - 1.75 * delta, y1 + delta / 6, x1 - 1.75 * delta, y1 - delta / 6).stroke({ width: 1 })
                positive = draw.positive(x1 - delta, y1 + 0.75 * delta, delta / 8);
                if (y1 == y2) {

                    negative = draw.negative(x1 - 1.75 * delta, y1 + 0.75 * delta, delta / 8, "Horizontal");

                }
                else {
                    negative = draw.negative(x1 - 1.75 * delta, y1 + 0.75 * delta, delta / 8, "Vertical");

                }



            }
            else {
                rect = draw.rect(L, 1.375*delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 + delta, y1).stroke({ width: 1 });
                line2 = draw.line(x1 + delta, y1 + delta / 2, x1 + delta, y1 - delta / 2).stroke({ width: 1 })
                line3 = draw.line(x1 + 1.5 * delta, y1 + delta / 2, x1 + 1.5 * delta, y1 - delta / 2).stroke({ width: 1 })
                line4 = draw.line(x1 + L - 1.25 * delta, y1, x1 + L, y1).stroke({ width: 1 })
                line5 = draw.line(x1 + 1.25 * delta, y1 + delta / 6, x1 + 1.25 * delta, y1 - delta / 6).stroke({ width: 1 })
                line6 = draw.line(x1 + 1.75 * delta, y1 + delta / 6, x1 + 1.75 * delta, y1 - delta / 6).stroke({ width: 1 })
                positive = draw.positive(x1 + delta, y1 + 0.75 * delta, delta / 8);
                if (y1 == y2) {
                    negative = draw.negative(x1 + 1.75 * delta, y1 + 0.75 * delta, delta / 8, "Horizontal");

                }
                else {
                    negative = draw.negative(x1 + 1.75 * delta, y1 + 0.75 * delta, delta / 8, "Vertical");

                }

            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(line1);
            this.add(line2);
            this.add(line3);
            this.add(line4);
            this.add(line5);
            this.add(line6);
            this.add(positive);
            this.add(negative);
            this.transform({ rotation: angle, cx: x1, cy: y1 })

        }
             , inherit: SVG.G
            , construct: {
                DCVoltageSource: function (x1, y1, x2, y2) {
                    return this.put(new SVG.DCVoltageSource(x1, y1, x2, y2))
                }
            }
    });

    SVG.extend(SVG.DCVoltageSource, {
        GenerateXML: function () {
            var str = '<vdc unit="Volt" name="' + this.attr('ElementID') + '" value="20" prefix="None"> \n <positive row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></positive> \n <negative row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></negative> \n </vdc>'

            return str;
        }
    });




/////// ------------ Draw  Circle DC Voltage Source At Any Direction  ---------------- ////////
    SVG.CircleDCVoltageSource = SVG.invent({
   create: function (x1, y1, x2, y2)
    {
        //draw.clear()
        var group = draw.group();
        var X = x2 - x1;
        var Y = y2 - y1;
        var L = Math.sqrt((X * X) + (Y * Y));
        var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
        var delta = L / 4;
        var line;
        var circle;
        var positive;
        var negative;
        var rect;
        var StartCircle;
        var EndCircle;
        this.constructor.call(this, SVG.create('g'));

        if (x2 < x1)
        {
            rect = draw.rect(L, delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            line = draw.line(x1, y1, x1 - L, y1).stroke({ width: 1 })
            circle = draw.circle(delta).center(x1 - L / 2, y1).stroke({ width: 1 }).fill('white')
            positive = draw,positive(x1 - (L / 2) + (delta / 4), y1, delta / 7)

            if (y1 == y2) {
                negative = draw.negative(x1 - (L / 2) - (delta / 4), y1, delta / 7, "Horizontal")

            }
            else
            {
                negative = draw.negative(x1 - (L / 2) - (delta / 4), y1, delta / 7, "Vertical");

            }



        }
        else
        {
            rect = draw.rect(L, delta).move(x1, y1 - delta/2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
            StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
            line = draw.line(x1, y1, x1 + L, y1).stroke({ width: 1 })
            circle = draw.circle(delta).center(x1 + L / 2, y1).stroke({ width: 1 }).fill('white')
            positive = draw.positive(x1 + (L / 2) - (delta / 4), y1, delta / 7)

            if (y1 == y2)
            {
                negative = draw.negative(x1 + (L / 2) + (delta / 4), y1, delta / 7, "Horizontal")

            }
            else
            {
                negative = draw.negative(x1 + (L / 2) + (delta / 4), y1, delta / 7, "Vertical");

            }

        }

        this.add(rect);
        this.add(StartCircle);
        this.add(EndCircle);
        this.add(line);
        this.add(circle);
        this.add(positive);
        this.add(negative);
        this.transform({ rotation: angle, cx: x1, cy: y1 })
}
             , inherit: SVG.G
            , construct: {
                CircleDCVoltageSource: function (x1, y1, x2, y2) {
                    return this.put(new SVG.CircleDCVoltageSource(x1, y1, x2, y2))
        }
            }
    });

    SVG.extend(SVG.CircleDCVoltageSource, {
        GenerateXML: function () {
            var str = '<vdc unit="Volt" name="' + this.attr('ElementID') + '" value="20" prefix="None"> \n <positive row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></positive> \n <negative row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></negative> \n </vdc>'

            return str;
        }
    });


////////////////// ---------------- Draw DC Current Source ------------------////////////
    SVG.DCCurrentSource = SVG.invent({
        create: function (x1, y1, x2, y2) {
            var group = draw.group();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line;
            var circle;
            var arrow;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));

            if (x2 < x1)
            {
                rect = draw.rect(L, delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line = draw.line(x1, y1, x1 - L, y1).stroke({ width: 1 })
                circle = draw.circle(delta - 0.25 * delta).center(x1 - L / 2, y1).stroke({ width: 1 }).fill('white')
                arrow = draw.Arrow(x1 - 1.25 * delta, y1, x1 - 1.75 * delta, y1);
            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line = draw.line(x1, y1, x1 + L, y1).stroke({ width: 1 })
                circle = draw.circle(delta - 0.25 * delta).center(x1 + L / 2, y1).stroke({ width: 1 }).fill('white')
                arrow = draw.Arrow(x1 + 1.25 * delta, y1, x1 + 1.75 * delta, y1);
            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(line);
            this.add(circle);
            this.add(arrow);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
            , inherit: SVG.G
            , construct: {
                DCCurrentSource: function (x1, y1, x2, y2) {
                    return this.put(new SVG.DCCurrentSource(x1, y1, x2, y2))
                }
            }
    });
    SVG.extend(SVG.DCCurrentSource, {
        GenerateXML: function () {
            var str = '<idc unit="Ampere" name="' + this.attr('ElementID') + '" value="20" prefix="None"> \n <positive row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></positive> \n <negative row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></negative> \n </idc>'

            return str;
        }
    });



    function sinewave()
    {
        var path1 = draw.path("M10 80  C 40 10, 65 10, 95 80 S 150 150, 180 80 Z").attr({ fill: 'none' });
        path1.stroke({ color: '#000', width: 2 })
    }

//////////// --------------- SPST Switch ------------------------
    SVG.SPSTSwitch = SVG.invent({
        create: function (x1, y1, x2, y2) {
            var group = draw.group();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var line1;
            var line2;
            var line3;
            var circle1;
            var circle2;
            var rect;
            var StartCircle;
            var EndCircle;
            this.constructor.call(this, SVG.create('g'));

            if (x1 > x2)
            {
                rect = draw.rect(L, delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 - delta, y1).stroke({ color: 'black', width: 1 });
                line2 = draw.line(x1 - 2 * delta, y1, x1 - L, y1).stroke({ color: 'black', width: 1 });
                line3 = draw.line(x1 - delta, y1, x1 - 2 * delta, y1 - scale).stroke({ color: 'black', width: 1 });
                circle1 = draw.circle(delta / 6).center(x1 - delta, y1).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
                circle2 = draw.circle(delta / 6).center(x1 - 2 * delta, y1).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
            }
            else
            {
                rect = draw.rect(L, delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 + delta, y1).stroke({ color: 'black', width: 1 });
                line2 = draw.line(x1 + 2 * delta, y1, x1 + L, y1).stroke({ color: 'black', width: 1 });
                line3 = draw.line(x1 + delta, y1, x1 + 2 * delta, y1 - scale).stroke({ color: 'black', width: 1 });
                circle1 = draw.circle(delta / 6).center(x1 + delta, y1).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
                circle2 = draw.circle(delta / 6).center(x1 + 2 * delta, y1).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle);
            this.add(line1);
            this.add(line2);
            this.add(line3);
            this.add(circle1);
            this.add(circle2);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
        }
                    , inherit: SVG.G
            , construct: {
                SPSTSwitch: function (x1, y1, x2, y2) {
                    return this.put(new SVG.SPSTSwitch(x1, y1, x2, y2))
                }
            }
    });

/*

<switch><toggleswitch><spst name="zzz"><points><pole row="" col=""></pole><throw row="" col="" state=""></throw></points></spst></toggleswitch></switch>

*/
    SVG.extend(SVG.SPSTSwitch, {
        GenerateXML: function () {

             
            var str = '<switch>\n<toggleswitch>\n<spst name="' + this.attr('ElementID') + '">\n<points>\n<pole row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '"></pole>\n<throw row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '" state="Off"></throw>\n</points>\n</spst>\n</toggleswitch>\n</switch>';
            return str;
        }
    });


//////////// --------------- DPST Switch ------------------------

    SVG.DPSTSwitch = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3, x4, y4) {
            var group = draw.group();
            var X = x3 - x1;
            var Y = y3 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var delta = L / 3;
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var rect;
            var StartCircle1;
            var EndCircle1;
            var StartCircle2;
            var EndCircle2;


            this.constructor.call(this, SVG.create('g'));
            var sw1 = draw.SPSTSwitch(x1, y1, x3, y3);
            var sw2 = draw.SPSTSwitch(x2, y1 + scale, x4, y3 + scale);
            if (x1>x2)
            {
                rect = draw.rect(L, 1.5 * delta).move(x1 - L, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle1 = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                StartCircle2 = draw.circle(7).center(x2 - L, y1 + scale).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x2, y3 + scale).fill('none').stroke({ color: '#000', width: 0.0 });
            }
            else
            {
                rect = draw.rect(L, 1.5 * delta).move(x1, y1 - 0.5 * delta).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle1 = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1 + L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                StartCircle2 = draw.circle(7).center(x2, y1 + scale).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x2 + L, y3 + scale).fill('none').stroke({ color: '#000', width: 0.0 });

            }
            this.add(rect);
            this.add(StartCircle1);
            this.add(EndCircle1);
            this.add(StartCircle2);
            this.add(EndCircle2);
            this.add(sw1);
            this.add(sw2);

        }
            , inherit: SVG.G
            , construct: {
                DPSTSwitch: function (x1, y1, x2, y2, x3, y3, x4, y4) {
                    return this.put(new SVG.DPSTSwitch(x1, y1, x2, y2, x3, y3, x4, y4))
                }
            }
    });

    SVG.extend(SVG.DPSTSwitch, {
        GenerateXML: function () {
            /*
            x1,y1
            DrawingPoint.X
            DrawingPoint.Y
            
            x2,y2
            DrawingPoint.X
            DrawingPoint.Y + 25
            
            X3,y3
            DrawingPoint.X + 100
            DrawingPoint.Y
            
            x4,y4
            DrawingPoint.X + 100
            DrawingPoint.Y + 25
            */
            
            var str = '<switch>\n<toggleswitch>\n<dpst name="' + this.attr('ElementID') + '">\n<points>\n<pole row="' + (this.attr("EndPointY") / scale) + '" col="' + (this.attr("EndPointX") / scale) + '"></pole>\n<pole row="' + (this.attr("EndPointY") / scale) + '" col="' + ((this.attr("EndPointX") / scale) + scale) + '"></pole>\n<throw row="' + (this.attr("StartPointY") / scale) + '" col="' + (this.attr("StartPointX") / scale) + '" state="Off"></throw>\n</points>\n</dpst>\n</toggleswitch>\n</switch>';
            return str;
        }
    });


//////////// --------------- SPDT Switch ------------------------

    SVG.SPDTSwitch = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var group = draw.group();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var spst;
            var line;
            var circle;
            var wire;
            var rect;
            var StartCircle1;
            var EndCircle1;
            var EndCircle2;

            this.constructor.call(this, SVG.create('g'));

            if (x1 > x2)
            {
                rect = draw.rect(L, 0.75 * delta).move(x1-L, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle1 = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x2, y1 - scale).fill('none').stroke({ color: '#000', width: 0.0 });
                spst = draw.SPSTSwitch(x1, y1, x1 - L, y1);
                line = draw.line(x1 - 2 * delta, y1 - scale, x1 - L, y1 -scale).stroke({ color: 'black', width: 1 });
                //wire = draw.line(x1 - L, y1 - 0.5 * delta + delta / 12, x3, y3).stroke({ color: 'black', width: 1 });
                circle = draw.circle(delta / 6).center(x1 - 2 * delta, y1 - scale).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
            }
            else {
                rect = draw.rect(L, 0.75*delta).move(x1, y1 - delta / 2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle1 = draw.circle(7).center(x1+L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x2, y1 - scale).fill('none').stroke({ color: '#000', width: 0.0 });
                spst = draw.SPSTSwitch(x1, y1, x1 + L, y1);
                line = draw.line(x1 + 2 * delta, y1 -scale, x1 + L, y1 - scale).stroke({ color: 'black', width: 1 });
                //wire = draw.line(x1 + L, y1 - 0.5 * delta + delta / 12, x3, y3).stroke({ color: 'black', width: 1 });
                circle = draw.circle(delta / 6).center(x1 + 2 * delta, y1 - scale).stroke({ color: 'black', width: 0.5 }).fill({ color: 'white' });
            }

            this.add(rect);
            this.add(StartCircle1);
            this.add(EndCircle1);
            this.add(EndCircle2);
            this.add(spst);
            this.add(line);
            //this.add(wire);
            this.add(circle);
            this.transform({ rotation: angle, cx: x1, cy: y1 })

        }
                    , inherit: SVG.G
            , construct: {
                SPDTSwitch: function (x1, y1, x2, y2, x3, y3) {
                    return this.put(new SVG.SPDTSwitch(x1, y1, x2, y2, x3, y3))
                }
            }
    });

    SVG.extend(SVG.SPDTSwitch, {
        GenerateXML: function () {            
            var str = '<switch>\n<toggleswitch>\n<spdt name="' + this.attr('ElementID') + '">\n<points>\n<pole row="' + (this.attr('StartPointY') / scale) + '" col="' + (this.attr('StartPointX') / scale) + '"></pole>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + (this.attr('EndPointX') / scale) + '" state="Off"></throw>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + ((this.attr('EndPointX') / scale) - scale) + '" state="Off"></throw>\n</points>\n</spdt>\n</toggleswitch>\n</switch>';
            return str;
        }
    });

/////////// Draw OR Part -------------------------
    SVG.ORPart = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var X = x3 - x1;
            var Y = y2 - y1;
            var delta = X / 3
            // var line2 = draw.line(x3 - delta, y3, x3, y3).stroke({ width: 1 })

            var PathStartX = x1 - (0.26 * delta) + delta;
            var PathStartY = y1 - Y / 2;

            var PathMidPointX = x1 + 0.50 * X;

            var PathEndPointX = x2 - (0.26 * delta) + delta;
            var PathEndPointY = y2 + Y / 2;

            this.constructor.call(this, SVG.create('g'));

            var SmallPath = draw.path("M" + PathStartX + "," + PathStartY + " Q" + PathMidPointX + "," + y3 + " " + PathEndPointX + "," + PathEndPointY).attr({ fill: 'none' });
            SmallPath.stroke({ color: '#000', width: 2 })


            var LargePathMidX = x3 + 8;

            var LargePath = draw.path("M" + PathStartX + "," + PathStartY + " Q" + LargePathMidX + "," + y3 + " " + PathEndPointX + "," + PathEndPointY).attr({ fill: 'none' });
            LargePath.stroke({ color: '#000', width: 2 })

        }
            , inherit: SVG.G
            , construct: {
                ORPart: function (x1, y1, x2, y2) {
                    return this.put(new SVG.ORPart(x1, y1, x2, y2))
                }
            }
    });
    //////////////////////////////

    SVG.OR = SVG.invent({
        create: function OR(x1, y1, x2, y2, x3, y3) {

            var X = x3 - x1;
            var Y = y2 - y1;
            var delta = X / 3
            this.constructor.call(this, SVG.create('g'));

            draw.ORPart(x1, y1, x2, y2, x3, y3);
            var line = draw.line(x1, y1, x1 + delta, y1).stroke({ width: 1 })
            var line1 = draw.line(x2, y2, x2 + delta, y2).stroke({ width: 1 })
        }
             , inherit: SVG.G
            , construct: {
                OR: function (x1, y1, x2, y2) {
                    return this.put(new SVG.OR(x1, y1, x2, y2))
                }
            }

    });

    SVG.ANDPart = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var group = draw.group();
            var X = x3 - x1;
            var YMid = y1 + (y2 - y1) / 2;
            var Y = y3 - YMid;
            var L = Math.sqrt((X * X) + (Y * Y));
            var Lvert = (4 / 5.5) * L;
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var curve;
            this.constructor.call(this, SVG.create('g'));

            if (x1 == x2) {
                if (x1 > x3) {

                }
                else {

                    //draw.path("M70 110 C 70 140, 100 140, 100 110").attr({ fill: 'none' }).stroke({ width: 1 })
                    //curve = draw.path("M" + (x1 + (1 / 5.5) * L) + "," + (YMid - 1.5 * Lvert) + " C " + (x1 + L) + "," +( YMid - 1.5 * Lvert )+ " " + (x1 + L) + "," + (YMid + 1.5 * Lvert) + " " + (x1 + (1 / 5.5) * L) + "," + (YMid + 1.5 * Lvert)).stroke({ width: 1 }).attr({ fill: 'none' });
                    curve = draw.path().M({ x: (x1 + (1 / 5.5) * L), y: (YMid - 1.5 * Lvert) }).C({ x: (x1 + L), y: (YMid - 1.5 * Lvert) }, { x: (x1 + L), y: (YMid + 1.5 * Lvert) }, { x: (x1 + (1 / 5.5) * L), y: (YMid + 1.5 * Lvert) }).stroke({ width: 1 }).attr({ fill: 'none' });
                    //curve = draw.path().m({x: 100, y: 100}).C({x: 100, y: 200}, {x: 200, y: 2oo}, {x: 200, y: 100})

                }

            }
            group.add(curve);
            group.transform({ rotation: angle, cx: x1, cy: y1 })
            return group;


        }
                     , inherit: SVG.G
            , construct: {
                ANDPart: function (x1, y1, x2, y2) {
                    return this.put(new SVG.ANDPart(x1, y1, x2, y2))
                }
            }
    });




    //////// NNNNNNNNNNOOOOOORRRRR -------------------
    function drawNOR(x1, y1, x2, y2, x3, y3) {
        // draw.clear()
        //alert("Entered NOR Function");
        drawOR(x1, y1, x2, y2, x3, y3)
        var X = x3 - x1;
        var Y = y2 - y1;
        //alert("IN NOR function X="+X,"Y="+Y);
        var xx = x3 - (X / 3) + 3;
        //alert("IN NOR function xx="+xx);
        var circle = draw.circle(Y / 2).center(xx, y3).fill('white').stroke({ color: '#000', width: 2 })
    }



    SVG.XOR = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {


            var X = x3 - x1;
            var Y = y2 - y1;
            var delta = X / 3
            this.constructor.call(this, SVG.create('g'));
            drawORPart(x1, y1, x2, y2, x3, y3);

            var line = draw.line(x1, y1, x1 + delta, y1).stroke({ width: 1 })
            var line1 = draw.line(x2, y2, x2 + delta, y2).stroke({ width: 1 })


            var XORPathStartX = x1 - (0.52 * delta) + delta;
            var XORPathStartY = y1 - Y / 2.5;
            var XORPathMidPointX = x1 + 0.4 * X;

            var XORPathEndPointX = x2 - (0.52 * delta) + delta;
            var XORPathEndPointY = y2 + Y / 2.5;

            var SmallPath = draw.path("M" + XORPathStartX + "," + XORPathStartY + " Q" + XORPathMidPointX + "," + y3 + " " + XORPathEndPointX + "," + XORPathEndPointY).attr({ fill: 'none' });
            SmallPath.stroke({ color: '#000', width: 2 })
        }
    });

 

    /////////// --------------- BJT NPN Transistor ------------ //////
    SVG.NPNTransistor = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var group = draw.group();
            var X = x3 - x1
            var Y;

            if (y2 > y3) {
                Y = y3 + (Math.abs(y2 - y3) / 2) - y1;
            }
            else {
                Y = y3 - (Math.abs(y2 - y3) / 2) - y1;
            }
            var L = Math.sqrt((X * X) + ((Y / 2) * (Y / 2)));
            alert("X= " + X);
            alert("Y= " + Y);
            alert("L= " + L);
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var line1;
            var line2;
            var line3;
            var arrow1;
            var line4;
            var line5;
            var rect;
            var StartCircle;
            var EndCircle1;
            var EndCircle2;
            this.constructor.call(this, SVG.create('g'));


            if (x1 > x2 && x1 > x3) {
                alert("IFFFFF");
                if (y3 > y2) {
                    rect = draw.rect(L, 2 * L).move(x1 - L, y2).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                }
                else {
                    rect = draw.rect(L, 2 * L).move(x1 - L, y3).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                }
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1, y1 - L).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x1, y1 + L).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 - (2.5 / 4) * L, y1).stroke({ width: 1 });
                line2 = draw.line(x1 - (2.5 / 4) * L, y1 - (1.5 / 4) * L, x1 - (2.5 / 4) * L, y1 + (1.5 / 4) * L).stroke({ width: 1 });
                line3 = draw.line(x1 - (2.5 / 4) * L, y1 - (0.75 / 4) * L, x1 - L, y1 - (1.5 / 4) * L).stroke({ width: 1 });
                arrow1 = draw.Arrow(x1 - (2.5 / 4) * L, y1 + (0.75 / 4) * L, x1 - L, y1 + (1.5 / 4) * L);

                line4 = draw.line(x1 - L, y1 - (1.5 / 4) * L, x1 - L, y1 - L).stroke({ width: 1 });
                line5 = draw.line(x1 - L, y1 + (1.5 / 4) * L, x1 - L, y1 + L).stroke({ width: 1 });
            }
            else
            {
                alert("Elseeeee");
                if (y3 > y2)
                {
                    rect = draw.rect(L, 2 * L).move(x1, y2).stroke({ width: 1 }).fill({ color: 'white', opacity: 0.0 });
                }
                else {
                    rect = draw.rect(L, 2 * L).move(x1, y3).stroke({ width: 1 }).fill({ color: 'white', opacity: 0.0 });
                }
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1 + L, y1-L).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x1 + L, y1+L).fill('none').stroke({ color: '#000', width: 0.0 });

                alert("x1=" + x1 + "\t y1=" + y1 + "\n x2=" + x2 + "\t y2=" + y2 + "\n x2=" + x3 + "\t y3=" + y3);
                line1 = draw.line(x1, y1, x1 + (2.5 / 4) * L, y1).stroke({color:'#000', width: 1 });
                line2 = draw.line(x1 + (2.5 / 4) * L, y1 - (1.5 / 4) * L, x1 + (2.5 / 4) * L, y1 + (1.5 / 4) * L).stroke({ width: 1 });
                line3 = draw.line(x1 + (2.5 / 4) * L, y1 - (0.75 / 4) * L, x1 + L, y1 - (1.5 / 4) * L).stroke({ width: 1 });
                arrow1 = draw.Arrow(x1 + (2.5 / 4) * L, y1 + (0.75 / 4) * L, x1 + L, y1 + (1.5 / 4) * L);

                line4 = draw.line(x1 + L, y1 - (1.5 / 4) * L, x1 + L, y1 - L).stroke({ width: 1 });
                line5 = draw.line(x1 + L, y1 + (1.5 / 4) * L, x1 + L, y1 + L).stroke({ width: 1 });
                alert("Tag");
            }

            this.add(rect);
            this.add(StartCircle);
            this.add(EndCircle1);
            this.add(EndCircle2);
            this.add(line1);
            this.add(line2);
            this.add(line3);
            this.add(arrow1);
            this.add(line4);
            this.add(line5);
            this.transform({ rotation: angle, cx: x1, cy: y1 });
            return group;

        }
            , inherit: SVG.G
            , construct: {
                NPNTransistor: function (x1, y1, x2, y2, x3, y3) {
                    return this.put(new SVG.NPNTransistor(x1, y1, x2, y2, x3, y3))
                }
            }
    });


    SVG.extend(SVG.NPNTransistor, {
        GenerateXML: function () {
            var str = '<transistor type="NPN" name="' + this.attr('ElementID') + '">\n<points>\n<emitter row="' + (this.attr('EndPointY')+4*scale / scale) + '" col="' + (this.attr('EndPointX') / scale) + '"></emitter>\n<tbase row="' + (this.attr('StartPointY') / scale) + '" col="' + (this.attr('EndPointX') / scale) + '" state="Off"></throw>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + ((this.attr('EndPointX') / scale) - scale) + '" state="Off"></throw>\n</points>\n</spdt>\n</toggleswitch>\n</switch>';
            return str;
        }
    });


    /////////// --------------- BJT PNP Transistor ------------ //////
    SVG.PNPTransistor = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var group = draw.group();
            var X = x3 - x1
            var Y;

            if (y2 > y3) {
                Y = y3 + (Math.abs(y2 - y3) / 2) - y1;
            }
            else {
                Y = y3 - (Math.abs(y2 - y3) / 2) - y1;
            }
            var L = Math.sqrt((X * X) + ((Y / 2) * (Y / 2)));
            alert("X= " + X);
            alert("Y= " + Y);
            alert("L= " + L);
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            alert("Angle= " + angle);

            var line1;
            var line2;
            var line3;
            var line4;
            var line5;
            var line6;
            var rect;
            var StartCircle;
            var EndCircle1;
            var EndCircle2;


            this.constructor.call(this, SVG.create('g'));


            if (x1 > x2 && x1 > x3) {

                rect = draw.rect(L, 2 * L).move(x1-L, y3).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1 - L, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1, y1 - L).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x1, y1 + L).fill('none').stroke({ color: '#000', width: 0.0 });

                line1 = draw.line(x1, y1, x1 - (2.5 / 4) * L, y1).stroke({ width: 1 });
                line2 = draw.line(x1 - (2.5 / 4) * L, y1 - (1.5 / 4) * L, x1 - (2.5 / 4) * L, y1 + (1.5 / 4) * L).stroke({ width: 1 });
                line3 = draw.Arrow(x1 - L, y1 - (1.5 / 4) * L, x1 - (2.5 / 4) * L, y1 - (0.75 / 4) * L);
                line4 = draw.line(x1 - (2.5 / 4) * L, y1 + (0.75 / 4) * L, x1 - L, y1 + (1.5 / 4) * L).stroke({ width: 1 });;

                line5 = draw.line(x1 - L, y1 - (1.5 / 4) * L, x1 - L, y1 - L).stroke({ width: 1 });
                line6 = draw.line(x1 - L, y1 + (1.5 / 4) * L, x1 - L, y1 + L).stroke({ width: 1 });

            }
            else {
                rect = draw.rect(L, 2 * L).move(x1, y3).stroke({ width: 0 }).fill({ color: 'white', opacity: 0.0 });
                StartCircle = draw.circle(7).center(x1, y1).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle1 = draw.circle(7).center(x1 + L, y1 - L).fill('none').stroke({ color: '#000', width: 0.0 });
                EndCircle2 = draw.circle(7).center(x1 + L, y1 + L).fill('none').stroke({ color: '#000', width: 0.0 });
                line1 = draw.line(x1, y1, x1 + (2.5 / 4) * L, y1).stroke({ width: 1 });
                line2 = draw.line(x1 + (2.5 / 4) * L, y1 - (1.5 / 4) * L, x1 + (2.5 / 4) * L, y1 + (1.5 / 4) * L).stroke({ width: 1 });
                line3 = draw.Arrow(x1 + L, y1 - (1.5 / 4) * L, x1 + (2.5 / 4) * L, y1 - (0.75 / 4) * L)
                line4 = draw.line(x1 + (2.5 / 4) * L, y1 + (0.75 / 4) * L, x1 + L, y1 + (1.5 / 4) * L).stroke({ width: 1 });

                line5 = draw.line(x1 + L, y1 - (1.5 / 4) * L, x1 + L, y1 - L).stroke({ width: 1 });
                line6 = draw.line(x1 + L, y1 + (1.5 / 4) * L, x1 + L, y1 + L).stroke({ width: 1 });

            }
            alert("Before Add to group");
            this.add(rect);
            alert("1");
            this.add(StartCircle);
            alert("2");
            this.add(EndCircle1);
            alert("3");
            this.add(EndCircle2);
            alert("4");
            this.add(line1);
            alert("5");
            this.add(line2);
            alert("6");
            this.add(line3);
            alert("7");
            this.add(line4);
            alert("8");
            this.add(line5);
            alert("9");
            this.add(line6);
            this.transform({ rotation: angle, cx: x1, cy: y1 })
            alert("Taaaaagh");
            return group;

        }

            , inherit: SVG.G
            , construct: {
                PNPTransistor: function (x1, y1, x2, y2, x3, y3) {
                    return this.put(new SVG.PNPTransistor(x1, y1, x2, y2, x3, y3))
                }
            }
    });


    SVG.extend(SVG.PNPTransistor, {
        GenerateXML: function () {
            var str = '<switch>\n<toggleswitch>\n<spdt name="' + this.attr('ElementID') + '">\n<points>\n<pole row="' + (this.attr('StartPointY') / scale) + '" col="' + (this.attr('StartPointX') / scale) + '"></pole>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + (this.attr('EndPointX') / scale) + '" state="Off"></throw>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + ((this.attr('EndPointX') / scale) - scale) + '" state="Off"></throw>\n</points>\n</spdt>\n</toggleswitch>\n</switch>';
            return str;
        }
    });


    SVG.Transistor = SVG.invent({
        create: function (x1, y1, x2, y2, x3, y3) {
            var group = draw.group();
            var X = x2 - x1;
            var Y = y2 - y1;
            var L = Math.sqrt((X * X) + (Y * Y));
            var angle = 360 * (Math.atan(Y / X)) / (2 * (Math.PI));
            var delta = L / 3;
            var polyline1;
            var ployline2;
            var arrow;
            var line;
            this.constructor.call(this, SVG.create('g'));

            polyline1 = draw.polyline([[x1, y1], [x1 + 2 * delta, y1], [x1 + 2 * delta, y1 - 0.5 * delta], [x1 + 2 * delta, y1 + 0.5 * delta]]).fill('white').stroke({ width: 1 });
            polyline2 = draw.polyline([[x1 + 2 * delta, y1 - 0.25 * delta], [x1 + 3 * delta, y1 - 0.5 * delta], [x1 + 3 * delta, y1 - 1.5 * delta]]).fill('white').stroke({ width: 1 });
            arrow = drawArrow(x1 + 2 * delta, y1 + 0.25 * delta, x1 + 3 * delta, y1 + 0.5 * delta);
            line = draw.line(x1 + 3 * delta, y1 + 0.5 * delta, x1 + 3 * delta, y1 + 1.5 * delta).stroke({ width: 1 });

            this.add(polyline1);
            this.add(ployline2);
            this.add(arrow);
            this.add(line);
        }

            , inherit: SVG.G
            , construct: {
                Transistor: function (x1, y1, x2, y2, x3, y3) {
                    return this.put(new SVG.Transistor(x1, y1, x2, y2, x3, y3))
                }
            }
    });

    SVG.extend(SVG.Transistor, {
        GenerateXML: function () {
            var str = '<switch>\n<toggleswitch>\n<spdt name="' + this.attr('ElementID') + '">\n<points>\n<pole row="' + (this.attr('StartPointY') / scale) + '" col="' + (this.attr('StartPointX') / scale) + '"></pole>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + (this.attr('EndPointX') / scale) + '" state="Off"></throw>\n<throw row="' + (this.attr('EndPointY') / scale) + '" col="' + ((this.attr('EndPointX') / scale) - scale) + '" state="Off"></throw>\n</points>\n</spdt>\n</toggleswitch>\n</switch>';
            return str;
        }
    });


    function btn_Draw_OnClick() {
        var mylist = document.getElementById("SelectList").selectedIndex;
        var X1 = parseInt(document.getElementById("txt_x1").value);
        var Y1 = parseInt(document.getElementById("txt_y1").value);
        var X2 = parseInt(document.getElementById("txt_x2").value);
        var Y2 = parseInt(document.getElementById("txt_y2").value);
        var X3 = parseInt(document.getElementById("txt_x3").value);
        var Y3 = parseInt(document.getElementById("txt_y3").value);
        var X4 = parseInt(document.getElementById("txt_x4").value);
        var Y4 = parseInt(document.getElementById("txt_y4").value);
        var CLR = document.getElementById("txt_clr").value;
        var radius = parseInt(document.getElementById("txt_radius").value);
        var space = parseInt(document.getElementById("txt_gridspace").value);

        switch (mylist) {
            //case "PhotoDiode":
            case 0:
                drawPhotoDiode(X1, Y1, X2, Y2, CLR);
                break;

                //case "OR":
            case 1:
                drawORPart(X1, Y1, X2, Y2, X3, Y3)
                break;

                //case "NOR":
            case 2:
                drawNOR(X1, Y1, X2, Y2, X3, Y3)
                break;

                //case "NOT":
            case 3:
                drawNOT(X1, Y1, X2, Y2);
                break;

                //case "Diode Sub Part":
            case 4:
                drawDiode(X1, Y1, X2, Y2, CLR)
                break;

                //case "PIN Diode":
            case 5:
                drawPINDiode(X1, Y1, X2, Y2)
                break;


                //case "LED":
            case 6:
                drawLED(X1, Y1, X2, Y2, CLR)
                break;

                //case "Varactor Diode":
            case 7:
                drawVaractorDiode(X1, Y1, X2, Y2)
                break;

                //case "Tunnel Diode":
            case 8:
                drawTunnelDiode(X1, Y1, X2, Y2)
                break;

                //case "Schotty Diode":
            case 9:
                drawSchottyDiode(X1, Y1, X2, Y2)
                break;

                //case "Constant Current Diode":
            case 10:
                drawConstCurrentDiode(X1, Y1, X2, Y2)
                break;


                //case "Wire":
            case 11:
                drawWire(X1, Y1, X2, Y2, CLR)
                break;

                //case "DC Voltage Source":
            case 12:
                drawDCVoltage(X1, Y1, X2, Y2)
                break;

                //case "Circle DC Voltage Source":
            case 13:
                drawCircleDCVoltage(X1, Y1, X2, Y2)
                break;

                //case "Positive Sign":
            case 14:
                drawPositive(X1, Y1, radius)
                break;

                //case "Negative Sign":
            case 15:
                drawNegative(X1, Y1, radius, "Horizontal")
                break;

                //case "Grid":
            case 16:
                drawGrid(X1, Y1, X2, Y2, space)
                break;

                //case "SineWave":
            case 17:
                sinewave()
                break;

                //case "Arrow":
            case 18:
                drawArrow(X1, Y1, X2, Y2)
                break;
            case 19:
                drawResistor(X1, Y1, X2, Y2)
                break;
            case 20:
                drawDCCurrent(X1, Y1, X2, Y2)
                break;
            case 21:
                drawVarResistor(X1, Y1, X2, Y2)
                break;
            case 22:
                drawCapacitor(X1, Y1, X2, Y2)    
                break;
            case 23:
                drawVarCapacitor(X1, Y1, X2, Y2)
                break;
            case 24:
                drawPolarizedCapacitor(X1, Y1, X2, Y2)
                break;
            case 25:
                drawVarPolarizedCapacitor(X1, Y1, X2, Y2);
                break;
            case 26:
                drawSPSTSwitch(X1, Y1, X2, Y2);
                break;
            case 27:
                drawDPSTSwitch(X1, Y1, X2, Y2, X3, Y3, X4, Y4)
                break;
            case 28:
                drawSPDTSwitch(X1, Y1, X2, Y2, X3)
                break;
            case 29:
                drawTransistor(X1, Y1, X2, Y2, X3)
                break;
            case 30:
                drawNPNTransistor(X1, Y1, X2, Y2, X3, Y3);
                break;
            case 31:
                drawPNPTransistor(X1, Y1, X2, Y2, X3, Y3);
                break;
            case 32:
                drawANDPart(X1, Y1, X2, Y2, X3, Y3);
                break;
                
            default:
                alert("Default")

        }
    }


    
    function ClearWindow()
    {
        draw.clear();
    }

