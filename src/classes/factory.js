import VueDatatableCell from '../vue-datatable-cell.vue';
import VueDatatableHeader from '../vue-datatable-header.vue';
import VueDatatablePagerButton from '../vue-datatable-pager-button.vue';
import TableType from './table-type.js';
import Settings from './settings.js';

/**
 * Registers Vuejs-Datatable components globally in VueJS.
 * You should add table types to the {@link table_types} list before using `Vue.use`.
 * 
 * @example import DatatableFactory from 'vuejs-datatable';
            Vue.use(DatatableFactory);
 */
class DatatableFactory {
    /**
     * Initialize the default factory
     */
    constructor(){
        this.table_types = [];
        this.use_default_type = true;
        this.default_table_settings = new Settings();
    }

    /**
     * Creates a new table type with a specified prefix, that you can customize using a callback.
     * 
     * @param {string} component_name - The name of the component to register.
     * @param {(tableType: TableType) => void | undefined} callback - An optional function to execute, that configures the newly created {@link TableType}.
     */
    registerTableType(component_name, callback){
        let table_type = new TableType(component_name);

        this.table_types.push(table_type);

        if(callback && typeof callback === 'function'){
            callback(table_type);
        }

        return this;
    }

    /**
     * Declares global components exported by vuejs-datatable, & load configs.
     * You should add table types to the {@link table_types} list before this function is called.
     * 
     * @param {Vue} Vue - The global Vue instance.
     */
    install(Vue){
        Vue.prototype.$datatables = {};

        Vue.component('datatable-cell', VueDatatableCell);
        Vue.component('datatable-header', VueDatatableHeader);
        Vue.component('datatable-button', VueDatatablePagerButton);

        if(this.use_default_type){
            this.registerTableType('datatable', function(table_type){
                table_type.mergeSettings(this.default_table_settings.properties);
            }.bind(this));
        }

        for(var i in this.table_types){
            this.installTableType(this.table_types[i].getId(), this.table_types[i], Vue);
        }
    }

    /**
     * Declares a pair of components (a Datatable & a Datatable-Pager) sharing a config.
     * 
     * @param {string} id - The base name of the datatable type.
     * @param {TableType} table_type - The configuration object that describes both datatable & the related pager.
     * @param {Vue} Vue - The global Vue instance.
     */
    installTableType(id, table_type, Vue){
        Vue.component(id, table_type.getTableDefinition());
        Vue.component(id + '-pager', table_type.getPagerDefinition());
    }
}

export default DatatableFactory;
