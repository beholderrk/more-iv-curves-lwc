import { ColorType, IChartApiBase, LineType, createChartEx } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { HorzScaleBehaviorPrice } from "./HorzScaleBehaviorPrice";
import css from "./CurvesChart.module.css";
import { genLine, polynomial1, randomFromTo } from "./gen-curves";

export function CurvesChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApiBase<number>>();

  useEffect(() => {
    if (!containerRef.current) return;
    const horzScaleBehavior = new HorzScaleBehaviorPrice();
    const chart = createChartEx<number, HorzScaleBehaviorPrice>(
      containerRef.current,
      horzScaleBehavior,
      {
        handleScroll: {
          // pressedMouseMove: false,
          // horzTouchDrag: false
        },
        rightPriceScale: {
          visible: false,
        },
        leftPriceScale: {
          visible: true,
        },
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: "#fff"
        },
        grid: {
          horzLines: {
            visible: false,
          },
          vertLines: {
            visible: false,
          },
        },
      }
    );
    chartRef.current = chart;

    for (let i = 0; i < 400; i++) {
      const line = chart.addLineSeries({
        pointMarkersVisible: false,
        lastValueVisible: false,
        baseLineVisible: false,
        priceLineVisible: false,
        lineWidth: 1,
        crosshairMarkerVisible: false,
        color: "rgba(255, 255, 255, 0.1)",
        lineType: LineType.Curved
      });
      line.setData(
        genLine(
          0,
          5,
          10,
          polynomial1(
            randomFromTo(-4, -2),
            randomFromTo(25, 30),
            randomFromTo(-45, -35),
            randomFromTo(30, 40)
          )
        )
      );
    }

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} className={css.chart}></div>;
}
