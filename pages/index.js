import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

// export async function getServerSideProps(context) {}

export default function Home() {
  const onSciptLoad = () => {
    setTimeout(() => {
      var board = JXG.JSXGraph.initBoard("box1", {
        boundingbox: [-10, 4, 10, -4],
        drag: {
          enabled: false,
        },
        pan: {
          enabled: false,
        },
        showcopyright: false,
        defaultAxes: {
          y: {
            tabIndex: null,
            ticks: {
              visible: true,
            },
          },
          x: {
            tabIndex: null,
            ticks: {
              visible: true,
            },
          },
        },
        axis: true,
        showNavigation: false,
      });
      
      let n = "x+" + Math.PI / 2;
      var f = board.create("functiongraph", [
        "sin(" + n + ")",
        -2 * Math.PI,
        2 * Math.PI,
      ]);

      var A = board.create("point", [Math.PI / 2, 0]);
      var B = board.create("point", [(3 * Math.PI) / 2, 0]);

      var height = 0.5; // height of the curly brace

      // Curly brace
      var crl = board.create("curve", [[0], [0]], {
        strokeWidth: 1,
        strokeColor: "black",
      });
      crl.bezierDegree = 3;
      crl.updateDataArray = function () {
        var d = [B.X() - A.X(), B.Y() - A.Y()],
          dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
          mid = [(A.X() + B.X()) * 0.5, (A.Y() + B.Y()) * 0.5];

        d[0] *= height / dl;
        d[1] *= height / dl;

        this.dataX = [
          A.X(),
          A.X() - d[1],
          mid[0],
          mid[0] - d[1],
          mid[0],
          B.X() - d[1],
          B.X(),
        ];
        this.dataY = [
          A.Y(),
          A.Y() - d[0],
          mid[1],
          mid[1] - d[0],
          mid[1],
          B.Y() - d[0],
          B.Y(),
        ];
      };

      // const height = 0.5;

      // var crl = board.create("curve", [[0], [0]], {
      //   strokeWidth: 2,
      //   strokeColor: "black",
      // });
      // crl.updateDataArray = function () {
      //   this.dataX = [Math.PI / 2, (3 * Math.PI) / 4, (3 * Math.PI) / 2];
      //   this.dataY = [-1.25 + (height / 2), -1.25, -1.25 + (height / 2)];
      // };

      crl.updateCurve();

      var ineq_lower = board.create("inequality", [f], {
        strokeColor: "red",
        fillColor: "none",
      });
      var ineq_greater = board.create("inequality", [f], {
        inverse: true,
        strokeColor: "green",
        fillColor: "none",
      });
    }, 10);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Script
          type="text/javascript"
          charset="UTF-8"
          src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"
          onLoad={onSciptLoad}
        />
        <div id="box1" style={{ height: "500px", width: "500px" }}></div>
      </main>
    </div>
  );
}
