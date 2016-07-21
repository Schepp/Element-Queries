(function () {
    var recalc = function recalc() {
            ElementQueries.init();
        };

    window.addEventListener('resize', recalc);

    [
        '.vcards',
        '.columns-column'
    ].forEach(function (selector) {
        var nodesArray = [].slice.call(document.querySelectorAll(selector));

        nodesArray.forEach(function (el) {
            console.log(el);

            new Sortable(el, {
                group: 'vcards',
                onEnd: function () {
                    recalc();
                }
            });
        });
    });
})();
