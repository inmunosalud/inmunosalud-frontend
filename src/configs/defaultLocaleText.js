export function getLocaleText() {
   return {
      // Root
      noRowsLabel: 'Sin filas',
      noResultsOverlayLabel: 'No encontró resultado.',

      // Columns selector toolbar button text
      toolbarColumns: 'Columnas',
      toolbarColumnsLabel: 'Columnas seleccionadas',

      // Filters toolbar button text
      toolbarFilters: 'Filtros',
      toolbarFiltersLabel: 'Mostrar filtros',
      toolbarFiltersTooltipHide: 'Ocultar filtros',
      toolbarFiltersTooltipShow: 'Mostrar filtros',
      toolbarFiltersTooltipActive: (count) =>
         count !== 1 ? `${count} activar filtros` : `${count} activar filtro`,

      // Quick filter toolbar field
      toolbarQuickFilterPlaceholder: 'Buscar…',
      toolbarQuickFilterLabel: 'Buscar',
      toolbarQuickFilterDeleteIconLabel: 'Limpiar',

      // Columns panel text
      columnsPanelTextFieldLabel: 'Encontrar columna',
      columnsPanelTextFieldPlaceholder: 'Titulo columna',
      columnsPanelDragIconLabel: 'Reordenar columna',
      columnsPanelShowAllButton: 'Mostrar todas',
      columnsPanelHideAllButton: 'Ocultar todas',

      // Filter operators text
      filterOperatorContains: 'contiene',
      filterOperatorEquals: 'iguales',
      filterOperatorStartsWith: 'inicia con',
      filterOperatorEndsWith: 'termina con',
      filterOperatorIsEmpty: 'esta vacio',
      filterOperatorIsNotEmpty: 'no esta vacio',
      filterOperatorIsAnyOf: 'es cualquiera de',

      // Filter panel text
      filterPanelAddFilter: 'Agregar filtro',
      filterPanelDeleteIconLabel: 'Eliminar',
      filterPanelLinkOperator: 'Operador logico',
      filterPanelOperators: 'Operador', // TODO v6: rename to filterPanelOperator
      filterPanelOperatorAnd: '&',
      filterPanelOperatorOr: '||',
      filterPanelColumns: 'Columnas',
      filterPanelInputLabel: 'Valor',
      filterPanelInputPlaceholder: 'Valor del filtro',

      // Column menu text
      columnMenuLabel: 'Menu',
      columnMenuShowColumns: 'Mostrar columnas',
      columnMenuFilter: 'Filtro',
      columnMenuHideColumn: 'Ocultar',
      columnMenuUnsort: 'Sin ordenar',
      columnMenuSortAsc: 'Ordenar por ASC',
      columnMenuSortDesc: 'Ordenar por DESC',

      // Column header text
      columnHeaderFiltersTooltipActive: (count) =>
         count !== 1 ? `${count} Filtros activos` : `${count} filtro activo`,
      columnHeaderFiltersLabel: 'Mostrar filtros',
      columnHeaderSortIconLabel: 'Ordenar',

      // Rows selected footer text
      footerRowSelected: (count) =>
         count !== 1
            ? `${count.toLocaleString()} filas seleccionadas`
            : `${count.toLocaleString()} fila seleccionada`,

      // Total row amount footer text
      footerTotalRows: 'Total de filas:',

      // Total visible row amount footer text
      footerTotalVisibleRows: (visibleCount, totalCount) =>
         `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

      // Checkbox selection text
      checkboxSelectionHeaderName: 'Seleccion checkbox',
      checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
      checkboxSelectionUnselectAllRows: 'Deseleccionar todas las filas',
      checkboxSelectionSelectRow: 'Seleccionar fila',
      checkboxSelectionUnselectRow: 'Deseleccionar fila',

      // Boolean cell text
      booleanCellTrueLabel: 'si',
      booleanCellFalseLabel: 'no',

      // Actions cell more text
      actionsCellMore: 'mas',

      // Column pinning text
      pinToLeft: 'Pin to left',
      pinToRight: 'Pin to right',
      unpin: 'Unpin',

      // Tree Data
      treeDataGroupingHeaderName: 'Group',
      treeDataExpand: 'see children',
      treeDataCollapse: 'hide children',

      // Grouping columns
      groupingColumnHeaderName: 'Group',
      groupColumn: (name) => `Group by ${name}`,
      unGroupColumn: (name) => `Stop grouping by ${name}`,

      // Master/detail
      detailPanelToggle: 'Detail panel toggle',
      expandDetailPanel: 'Expand',
      collapseDetailPanel: 'Collapse',

      // Used core components translation keys
      MuiTablePagination: {},

      // Row reordering text
      rowReorderingHeaderName: 'Row reordering',

      // Aggregation
      aggregationMenuItemHeader: 'Aggregation',
      aggregationFunctionLabelSum: 'sum',
      aggregationFunctionLabelAvg: 'avg',
      aggregationFunctionLabelMin: 'min',
      aggregationFunctionLabelMax: 'max',
      aggregationFunctionLabelSize: 'size',

      footerPaginationRowsPerPage: 'Filas por pagina'
   }
}