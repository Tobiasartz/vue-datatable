// Type definitions for vuejs-datatable 1.5.3
// Project: vue-datatable
// Definitions by: GerkinDev <https://github.com/gerkinDev/>

declare module 'vuejs-datatable'{
	import Vue, { PluginFunction, PluginObject } from 'vue';
	
	class DatatableFactory implements PluginObject<{}> {
		[key: string]: any;
		public install: PluginFunction<{}>;
	}
	const VuePlugin: DatatableFactory;
	
	export default VuePlugin;
	
	export interface IDataCallbackOptions{
		page_number: number;
		page_length: number;
		sort_by: string;
	}

	/**
	 * A datatable component, with its specific methods
	 * 
	 * @typeParam TRow - The type of the item to bind in the table
	 */
	export interface IVueDatatable<TRow> extends Vue {
		// Props
		name: string;
		columns: ColumnDefinitions<TRow>;
		data: (options: IDataCallbackOptions, callback: (rows: TRow[], rowCount: number) => void) => void;
		filterBy: string;
		rowClasses: null | ((row: TRow) => string) | string;
		// Data
		readonly sort_by: null | IColumnDefinition<TRow>,
		readonly sort_dir: null | 'asc' | 'desc',
		readonly total_rows: number,
		readonly page: number,
		readonly per_page: null | number,
		readonly processed_rows: TRow[],
		// Computed
		readonly rows: TRow[];
		readonly settings: unknown;
		readonly handler: unknown;
		readonly normalized_columns: unknown;
		readonly table_class: string;
		// Methods
		getSortDirectionForColumn(columnDefinition: IColumnDefinition<TRow>): 'asc' | 'desc';
		setSortDirectionForColumn(direction: 'asc' | 'desc', columnDefinition: IColumnDefinition<TRow>): void;
		processRows(): void;
		getRowClasses(row: TRow): string;
	}
	
	/**
	 * Description of a single column of a datatable.
	 * 
	 * @typeParam TRow - The type of the item to bind on the row
	 */
	export interface IColumnDefinition<TRow>{
		/**
		 * Text in the heading element
		 */
		label: string;
		/**
		 * Name of the field to get.
		 * You can use `representedAs` for further customization
		 */
		field?: keyof TRow;
		/**
		 * Apply a function on the row to generate the displayed content
		 * 
		 * @param row TRow - The current row to transform and display
		 */
		representedAs?(row: TRow): string;

		/**
		 * Enable sorting on this field.
		 * Default value depends on the type of the field.
		 */
		sortable?: boolean;

		/**
		 * Parse HTML of the content
		 * Defaults to `false`
		 */
		interpolate?: boolean;
	}
	
	/**
	 * Description of all columns of a datatable.
	 * 
	 * @typeParam TRow - The type of the item to bind on the row
	 */
	export type ColumnDefinitions<TRow> = IColumnDefinition<TRow>[];
}
