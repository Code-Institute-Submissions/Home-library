   queue()
    .defer(d3.json, "data/books.json")
    .await(makeGraphs);
    
    function makeGraphs(error, booksData) {
   var ndx = crossfilter(booksData);
   
   show_place(ndx);
   show_spend(ndx);
   show_author(ndx);
   show_type(ndx);
   show_readed(ndx);
   show_language(ndx);
   show_year(ndx);
   
    dc.renderAll();
    
    }
    
    
    function show_year(ndx){
    var dim = ndx.dimension(dc.pluck("year"));
    var group = dim.group();
    
    dc.pieChart("#year-balance")
        .height(500)
        .radius(300)
        .transitionDuration(500)
        .dimension(dim)
        .group(group)
        .legend(dc.legend().gap(10))
}

function show_language(ndx){
    var dim = ndx.dimension(dc.pluck("language"));
    var group = dim.group();
    
    dc.barChart("#language-balance")
        .width(400)
        .height(600)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(false)
        .xAxisLabel("language")
        .yAxisLabel("books")
        .yAxis().ticks(10)
}

function show_readed(ndx){
    var dim = ndx.dimension(dc.pluck("read"));
    var group = dim.group();
    
    dc.barChart("#readed-balance")
        .width(400)
        .height(600)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(false)
        .xAxisLabel("readed or non-readed")
        .yAxisLabel("books")
        .yAxis().ticks(10)
}

function show_place(ndx){
    var dim = ndx.dimension(dc.pluck("place"));
    var group = dim.group();
    
    dc.barChart("#place-balance")
        .width(400)
        .height(600)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(false)
        .xAxisLabel("place")
        .yAxisLabel("books")
        .yAxis().ticks(10)
}

function show_type(ndx){
    var dim = ndx.dimension(dc.pluck("type"));
    var group = dim.group();
    
    dc.pieChart("#type-balance")
        .height(500)
        .radius(300)
        .transitionDuration(500)
        .dimension(dim)
        .group(group)
        .legend(dc.legend().gap(10))
}

function show_author(ndx){
    var dim = ndx.dimension(dc.pluck("author"));
    var group = dim.group();
    
    dc.barChart("#author-balance")
        .width(1200)
        .height(500)
        .margins({top:10, right:70, bottom:30, left: 70})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Author")
        .yAxisLabel("Books")
        .yAxis().ticks(10);
}

function show_spend(ndx){
    var place_dim = ndx.dimension(dc.pluck("place"));
    var spendByPlaceLanguagePolish = place_dim.group().reduceSum(function (d) {
        if(d.place === "online") {
            return +d.spend;
        } else {
            return 0;
        }
    });
    
    
    var spendByPlaceLanguageEnglish = place_dim.group().reduceSum(function (d) {
        if(d.place === "store") {
            return +d.spend;
        } else {
            return 0;
        }
    });
    
    
    var stackedChart = dc.barChart("#spend-balance");
    
    stackedChart
        .width(400)
        .height(600)
        .dimension(place_dim)
        .group(spendByPlaceLanguagePolish, "Polish")
        .stack(spendByPlaceLanguageEnglish, "English")
        .x(d3.scale.ordinal())
        .legend(dc.legend().x(380).y(0).itemHeight(10).gap(6));
    stackedChart.margins().right = 50;
    
 
}





        
        
















