// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import {Socket} from "phoenix"
import NProgress from "nprogress"
import {LiveSocket} from "phoenix_live_view"
import FunnelGraph from "funnel-graph-js"

let Hooks = {}
Hooks.Funnel = {
    my_data() { return JSON.parse(this.el.dataset.values) },
    mounted() {
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTT");
        const el_width = this.el.clientWidth

        this.graph = new FunnelGraph({
            container: '.funnel',
            data: this.my_data(),
            direction: 'horizontal', // or 'vertical'
            gradientDirection: 'horizontal', // or 'vertical'
            displayPercent: true,
            width: el_width,
            height: 800,
            subLabelValue: 'raw'
        });

        // this.last_value = this.my_data();

        this.graph.draw();
    },

    updated() {
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD");
        console.log(this);

        this.graph.draw();
        this.graph.updateData(this.my_data());
    }
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}, hooks: Hooks})

// Show progress bar on live navigation and form submits
window.addEventListener("phx:page-loading-start", info => NProgress.start())
window.addEventListener("phx:page-loading-stop", info => NProgress.done())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)
window.liveSocket = liveSocket
