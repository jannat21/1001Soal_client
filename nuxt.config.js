const pkg = require("./package");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.1.1.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
      },
      {
        src: "https://cdn.rtlcss.com/bootstrap/v4.2.1/js/bootstrap.min.js"
      },
      {
        src: "//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/trumbowyg.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/langs/fa.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/allowtagsfrompaste/trumbowyg.allowtagsfrompaste.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/base64/trumbowyg.base64.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/cleanpaste/trumbowyg.cleanpaste.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/colors/trumbowyg.colors.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/emoji/trumbowyg.emoji.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/fontfamily/trumbowyg.fontfamily.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/fontsize/trumbowyg.fontsize.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/history/trumbowyg.history.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/lineheight/trumbowyg.lineheight.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/mathml/trumbowyg.mathml.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/mention/trumbowyg.mention.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/noembed/trumbowyg.noembed.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/pasteembed/trumbowyg.pasteembed.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/pasteimage/trumbowyg.pasteimage.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/preformatted/trumbowyg.preformatted.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/specialchars/trumbowyg.specialchars.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/table/trumbowyg.table.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.18.0/plugins/template/trumbowyg.template.min.js"
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        //href: "https://cdn.rtlcss.com/bootstrap/v4.0.0/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://adabamuz.ir/assets/bootstrap/css/bootstrapflat.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/earlyaccess/notonaskharabic.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/ui/trumbowyg.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/colors/ui/trumbowyg.colors.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/emoji/ui/trumbowyg.emoji.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/highlight/ui/trumbowyg.highlight.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/mathml/ui/trumbowyg.mathml.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/mention/ui/trumbowyg.mention.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/specialchars/ui/trumbowyg.specialchars.min.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.17.0/plugins/table/ui/trumbowyg.table.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://adabamuz.ir/assets/bootstrap/css/custom.css"
      },

    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },

  /*
   ** Global CSS
   */
  css: [
    "vue-multiselect/dist/vue-multiselect.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/vue-toasted",
      ssr: false
    },
    {
      src: "~/plugins/multiselect",
      ssr: false
    },
    {
      src: "~/plugins/fontawesome",
      ssr: false
    },
    {
      src: "~/plugins/paginate",
      ssr: false
    },
    {
      src: "~/plugins/vue-jalali-moment",
      ssr: false
    },

  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://bootstrap-vue.js.org/docs/
    //'bootstrap-vue/nuxt',
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    //baseURL: "http://bamoaleman.ir:3001/api/"
    baseURL: "http://localhost:3001/api/"
    //baseURL: 'http://localhost:8080/khane2/API/index.php/'
    // See https://github.com/nuxt-community/axios-module#options
  },

  auth: {
    redirect: {
      login: "/",
      logout: "/",
      callback: "/callback",
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "users/login",
            method: "post",
            propertyName: "user.token"
          },
          logout: {
            url: "users/logout",
            method: "post"
          },
          user: {
            url: "user",
            method: "get"
          }
        },
        tokenType: "Token"
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
};
