import { useState, memo, ReactNode } from 'react';
import './index.less';
export interface TWidgetPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface TWidgetOptions {
  position: TWidgetPosition;
  children: ReactNode;
  name?: string;
  icon: string;
  width?: number;
  height?: number;
  openHandle?: (value: boolean) => void;
}

export const ControlICONS = {
  Swipe:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+',
  Legend:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+',
  LayerList:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg==',
  Measure:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWEftlrENAjEMRd+NQMkKdAh6YAHGoKCnBnpaCuZgAGAAJBoYgJYhQI4SKeSCThROUuSak/7l7O+fb8sNmZ8mc34qgaIUOFk/XICNkjck7sTGnsnbV+BtP2yVCaxtHpM7RkCp+FbYcgmclSWYdl1BNg/4ztfsAjG73L/JUdQcUL76eHhfAWeOVESM2YucA9nbUNuYbuT/nISVQKjACHgCL689pGNCr4RYH+gBj6Ct/rqCAXAHjsDcBnLYDlhZ7AAsgCFws9geWAJj4OqR+IuAVCWLilRrFggghskZweWMUyaGyf+VQKcCqUZxaw64pTQVgdZSmirxVx7tqddZVCWQXYEP/oRLIWGFgyoAAAAASUVORK5CYII=',
};

const BaseWidget = (props: TWidgetOptions) => {
  const { position, children, name, icon, width, height, openHandle } = props;
  const [open, setOpen] = useState(false);
  const controlStyle = { width: open ? width ?? 30 : 30, height: open ? height ?? 30 : 30, ...position };

  const onClickHandle = () => {
    if (openHandle) {
      openHandle(true);
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="mapboxgl-control" style={controlStyle}>
      <div className="mapboxgl-bar">
        <div
          className="mapboxgl-bar-button"
          onClick={onClickHandle}
          title={name ?? ''}
          style={{ backgroundImage: `url(${icon})` }}
        />
        {name && <div className="mapboxgl-bar-title">{name}</div>}
      </div>
      {open && children}
    </div>
  );
};
export default memo(BaseWidget);
