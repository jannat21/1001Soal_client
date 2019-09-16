
export default function (ctx) {
    console.log('CTX', ctx);


    if (ctx.app.$auth.$state.loggedIn && ctx.app.$auth.$state.user && ctx.app.$auth.$state.user.role=='admin') {
        
        // -- Authorized --
        // Redirect to home page if inside login page (or login page disabled)
        //if (!login || normalizePath(ctx.route.path) === normalizePath(login)) {
            //ctx.app.$auth.redirect('home')
        //}
    } else {
        // -- Guest --
        // Redirect to login page if not authorized and not inside callback page
        // (Those passing `callback` at runtime need to mark their callback component
        // with `auth: false` to avoid an unnecessary redirect from callback to login)
        //if (!callback || normalizePath(ctx.route.path) !== normalizePath(callback)) {
            ctx.app.$auth.redirect('login')
        //}
    }
    //mapGetters (["isAuthenticated", "loggedInUser"]);
    /*if (!process.server) {
        console.log("middleware from client side");
        var user = store.store.getters.loggedInUser;
        console.log('USER:', user)
        if (store.store.getters.isAuthenticated && user) {
            if (user.role == 'admin') { return true; } else { return false; }
        } else {
            return false;
            
        }

    }*/
}