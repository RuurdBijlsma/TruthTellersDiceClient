(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5776454f"],{1586:function(t,e,o){},"277f":function(t,e,o){"use strict";o("1586")},"4a65":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"simulation",style:{maxHeight:t.$vuetify.breakpoint.height-t.$vuetify.application.top-t.$vuetify.application.bottom+"px"}},[o("h1",[t._v("Simulate")]),o("game-config",{staticClass:"mb-3"}),o("v-btn",{on:{click:t.promptSimulateGames}},[t._v("Simulate")]),o("pre",[t._v(t._s(t.simulationResults))])],1)},i=[],s=o("5530"),a=o("2f62"),c=o("af4c"),r=o("8055"),u=o.n(r),l=o("3d20"),m=o.n(l),f={name:"Simulate",components:{GameConfig:c["a"]},data:function(){return{loadingSimulation:!1}},beforeDestroy:function(){this.socket.destroy(),this.$store.commit("socket",null)},mounted:function(){var t=this;console.log("Connecting to ".concat(this.$store.state.url)),this.$store.commit("socket",u()(this.$store.state.url));var e=!1;this.socket.on("connect",(function(){console.log("CONNECT")})),this.socket.on("connect_error",(function(o){console.warn(o.message),e||(e=!0,m.a.fire({title:"Can't connect to server, run the TruthTellersDice server before loading this page.",text:"Server IP ".concat(t.$store.state.url),icon:"error"}))})),console.log("Server starting:",this.socket),this.setSocketListeners()},methods:Object(s["a"])({promptSimulateGames:function(){this.loadingSimulation=!0,this.simulateGames(+prompt("How many iterations?","100"))},setSocketListeners:function(){var t=this;this.socket.on("simulation_data",(function(e){console.log("received simulation_data",e),t.$store.commit("simulationResults",e)}))}},Object(a["b"])(["simulateGames"])),computed:Object(s["a"])({},Object(a["d"])({socket:function(t){return t.socket},simulationResults:function(t){return t.simulationResults}})),watch:{simulationResults:function(){this.loadingSimulation=!1}}},h=f,p=(o("277f"),o("2877")),d=o("6544"),v=o.n(d),g=o("8336"),k=Object(p["a"])(h,n,i,!1,null,"6c835500",null);e["default"]=k.exports;v()(k,{VBtn:g["a"]})}}]);
//# sourceMappingURL=chunk-5776454f.24a7ecd0.js.map