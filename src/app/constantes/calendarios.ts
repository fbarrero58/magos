declare var $: any;

export const CONFIG_HORAS = {
    viewRender: function(view, element) {
        if (view.name !== 'month') {
            $(element).find('.fc-scroller').perfectScrollbar();
        }
    },
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Lista'
    },
    header: {
        left: 'title',
        right: 'prev,next,today'
    },
    views: {
        month: {
            titleFormat: 'MMMM YYYY'
        },
        week: {
            titleFormat: ' MMMM D YYYY'
        },
        day: {
            titleFormat: 'D MMM, YYYY'
        }
    },
};
