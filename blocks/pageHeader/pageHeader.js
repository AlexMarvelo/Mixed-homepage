var $ = require('jquery');
var config = require('../../scripts/modules/config.js');

module.exports = {
    init: function () {
        var self = this;
        $('.pageHeader').each(function () {
            var header = $(this),
                mainMenu = header.find('.pageHeader__mainMenu'),
                mainMenuContainer = header.find('.pageHeader__mainMenuContainer'),
                mainMenuItems = mainMenu.find('.pageHeader__mainMenuItem'),
                mainMenuToggle = header.find('.pageHeader__mainMenuToggle'),
                mobileBreackpoint = 799,
                headerTopRowHeight = 48;

            mainMenuToggle.click(function (event) {
                if (config.currentWindowWidth > mobileBreackpoint) return;
                event.preventDefault();
                mainMenuContainer.height(config.currentWindowHeight() - headerTopRowHeight);
                mainMenuContainer.toggleClass('pageHeader__mainMenuContainer_opened');
                $('body').toggleClass('body_fixed');

                if (!mainMenuContainer.hasClass('pageHeader__mainMenuContainer_opened')) {
                    setTimeout(function () {
                        self.closeAllMenuItems(mainMenu);
                        mainMenuContainer.height('auto');
                    }, 300);
                }
            });

            mainMenuItems.each(function (currentItemIndex) {
                var mainMenuItem = $(this),
                    mainMenuLink = mainMenuItem.find('.pageHeader__mainMenuLink'),
                    mainMenuSubmenuItems = mainMenuItem.find('.pageHeader__mainMenuSubmenuItem');

                mainMenuLink.click(function (event) {
                    if (mainMenuLink.attr('href') != 'javascript:void(0)') return;
                    event.preventDefault();

                    mainMenuItems.filter(function (index) {
                        var item = $(this);
                        if (index != currentItemIndex) self.closeMainMenuSubmenu(item);
                    });
                    if (mainMenuItem.hasClass('pageHeader__mainMenuItem_opened')) {
                        self.closeMainMenuSubmenu(mainMenuItem);
                    } else {
                        self.openMainMenuSubmenu(mainMenuItem);
                    }
                });

                mainMenuSubmenuItems.each(function (currentItemIndex) {
                    var mainMenuSubmenuItem = $(this),
                        mainMenuSubmenuLink = mainMenuSubmenuItem.find('.pageHeader__mainMenuSubmenuLink');

                    mainMenuSubmenuItem.hover(function () {
                        if (config.currentWindowWidth() <= mobileBreackpoint) return;
                        mainMenuSubmenuItem.addClass('pageHeader__mainMenuSubmenuItem_opened');
                    }, function () {
                        if (config.currentWindowWidth() <= mobileBreackpoint) return;
                        mainMenuSubmenuItem.removeClass('pageHeader__mainMenuSubmenuItem_opened');
                    });

                    mainMenuSubmenuLink.click(function (event) {
                        if (config.currentWindowWidth() > mobileBreackpoint || mainMenuSubmenuLink.attr('href') != 'javascript:void(0)') return;
                        event.preventDefault();

                        mainMenuSubmenuItems.filter(function (index) {
                            var item = $(this);
                            if (index != currentItemIndex) self.closeMainMenuSubmenuItem(item);
                        });
                        if (mainMenuSubmenuItem.hasClass('pageHeader__mainMenuSubmenuItem_opened')) {
                            self.closeMainMenuSubmenuItem(mainMenuSubmenuItem);
                        } else {
                            self.openMainMenuSubmenuItem(mainMenuSubmenuItem);
                        }
                    });
                });
            });
        });
    },

    closeMainMenuSubmenu: function (mainMenuItem) {
        var mainMenuSubmenuContainer = mainMenuItem.find('.pageHeader__mainMenuSubmenuContainer');
        mainMenuSubmenuContainer.removeClass('pageHeader__mainMenuSubmenuContainer_freeSize');
        mainMenuSubmenuContainer.height(0);
        setTimeout(function () {
            mainMenuItem.removeClass('pageHeader__mainMenuItem_opened');
        }, 300);
    },

    openMainMenuSubmenu: function (mainMenuItem) {
        var mainMenuSubmenuContainer = mainMenuItem.find('.pageHeader__mainMenuSubmenuContainer'),
            mainMenuSubmenu = mainMenuItem.find('.pageHeader__mainMenuSubmenu');
        mainMenuItem.addClass('pageHeader__mainMenuItem_opened');
        setTimeout(function () {
            mainMenuSubmenuContainer.height(mainMenuSubmenu.height());
        }, 300);
        setTimeout(function () {
            mainMenuSubmenuContainer.addClass('pageHeader__mainMenuSubmenuContainer_freeSize');
        }, 600);
    },

    closeMainMenuSubmenuItem: function (mainMenuSubmenuItem) {
        var mainMenuSubmenu = mainMenuSubmenuItem.find('.pageHeader__mainMenuSubSubmenu'),
            mainMenuSubmenuLinkHeight = mainMenuSubmenu.find('.pageHeader__mainMenuSubSubmenuLink').height();
        mainMenuSubmenuItem.height(mainMenuSubmenuLinkHeight);
        setTimeout(function () {
            mainMenuSubmenuItem.removeClass('pageHeader__mainMenuSubmenuItem_opened');
        }, 300);
    },

    openMainMenuSubmenuItem: function (mainMenuSubmenuItem) {
        var mainMenuSubmenu = mainMenuSubmenuItem.find('.pageHeader__mainMenuSubSubmenu'),
            mainMenuSubmenuLinkHeight = mainMenuSubmenu.find('.pageHeader__mainMenuSubSubmenuLink').height();
        mainMenuSubmenuItem.addClass('pageHeader__mainMenuSubmenuItem_opened');
        setTimeout(function () {
            mainMenuSubmenuItem.height(mainMenuSubmenu.height() + mainMenuSubmenuLinkHeight);
        }, 300);
    },

    closeAllMenuItems: function (mainMenu) {
        var self = this;
        var mainMenuItems = mainMenu.find('.pageHeader__mainMenuItem');
        mainMenuItems.each(function () {
            var mainMenuItem = $(this),
                mainMenuSubmenuItems = mainMenuItem.find('.pageHeader__mainMenuSubmenuItem');
            self.closeMainMenuSubmenu(mainMenuItem);
            mainMenuSubmenuItems.each(function () {
                var mainMenuSubmenuItem = $(this);
                self.closeMainMenuSubmenuItem(mainMenuSubmenuItem);
            });
        });
    }
};
