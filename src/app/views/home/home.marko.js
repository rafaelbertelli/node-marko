// Compiled using marko@4.18.14 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/casadocodigo$1.0.0/src/app/views/home/home.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    Layout = require("../layout/layout.marko"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_dynamicTag = marko_helpers.d,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_loadTag = marko_helpers.t,
    await_tag = marko_loadTag(require("marko/src/core-tags/core/await/renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  marko_dynamicTag(out, Layout, function() {
    return {
        cabecalho: {
            renderBody: function(out) {
              out.w("<h1>Casa do Código - Home</h1>");
            }
          }
      };
  }, null, null, null, __component, "0");

  var livrosPromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve([
      {
        titulo: 'Cangaceiro Node'
      },
      {
        titulo: 'Node na prática'
      }
    ]);
  }, 3000);
});

  await_tag({
      _provider: livrosPromise,
      _name: "livrosPromise",
      then: {
          renderBody: function(out, livros) {
            var $for$0 = 0;

            marko_forEach(livros, function(livro) {
              var $keyScope$0 = "[" + (($for$0++) + "]");

              out.w("<div>Título: " +
                marko_escapeXml(livro.titulo) +
                "</div>");
            });
          }
        }
    }, out, __component, "3");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/casadocodigo$1.0.0/src/app/views/home/home.marko",
    tags: [
      "../layout/layout.marko",
      "marko/src/core-tags/core/await/renderer"
    ]
  };
