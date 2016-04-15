angular.module('adminApp.controllers',[])
  .controller('AdsListController',function($scope,$state,ngDialog,$window,Ad) {
    $scope.cdn_path = IMIGO.CDN_PATH;
    
    $scope.data = {
      adsLimit: 40,
      availableCategories: [
        {id: 'friendship', name: 'Friendship'},
        {id: 'romance', name: 'Romance'},
        {id: 'professional', name: 'Professional'}
      ],
      availableLanguages: [
        {id: 'en', name: 'English'},
        {id: 'ru', name: 'Russian'},
        {id: 'jp', name: 'Japanese'}
      ],
      availableRoles: [
        {id: 'all', name: 'All'},
        {id: 'customer', name: 'Customer'},
        {id: 'performer', name: 'Performer'},
      ]
    };

    $scope.category_lang_map = {
      'en': {
          'friendship': 'Friendship',
          'romance': 'Romance',
          'professional': 'Work',
      },
      'ru': {
          'friendship': 'Дружба',
          'romance': 'Романтика',
          'professional': 'Работа',
      }
    }

    $scope.data.selectedCategory = $scope.data.availableCategories[0]
    $scope.data.selectedLanguage = $scope.data.availableLanguages[0]
    $scope.data.selectedRole = $scope.data.availableRoles[0]   

    $scope.getDisplayName = function(id, dictionary) {
      var r = dictionary.find(function(v) { return v.id == id; });
      return r == null ? id : r.name;
    };

    $scope.getLanguageName = function(id) {
      return this.getDisplayName(id, this.data.availableLanguages);
    };

    $scope.getCategoryName = function(id) {
      return this.getDisplayName(id, this.data.availableCategories);
    };

    $scope.reloadAds = function() {
      query_data = {
        category: this.data.selectedCategory.id, language: this.data.selectedLanguage.id, limit: this.data.adsLimit
      }

      if(this.data.selectedRole.id !== 'all') {
        query_data.role = this.data.selectedRole.id
      }

      this.ads = Ad.query(query_data);
    };

    $scope.deleteFromList = function(ad_id) {
      var index = -1;
      var ads = eval(this.ads);
      for (var i = 0; i < ads.length; i++) {
        if (ads[i]._id === ad_id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        alert("Something gone wrong");
      } else {
        this.ads.splice(index, 1);
      }
      if (this.ads.length == 0) {
        this.reloadAds();
      }
    };

    $scope.acceptAd = function(ad) {
      me = this;
      Ad.update({}, {id: ad._id, 'accepted': true}, function() { me.deleteFromList(ad._id); });
    };

    $scope.data_selected = null;
    $scope.data_templates = [
      {id: "ru", text: "\
Ваше объявление было отклонено, поскольку не соответствует политике IMIGO.ME.\n\
1. Запрещено размещать объявления в категории, не соответствующей материалу объявления.\n\
2. Запрещено использование в тексте объявления других языков, кроме выбранного в меню создания объявления.\n\
3. Запрещено использовать:\n\
a. фотографии низкого качества или изменённые в графическом редакторе\n\
b. фотографии, на которых изображены люди до 18 лет\n\
c. чужие фотографии (например, изображения знаменитых людей)\n\
d. изображения со сценами насилия\n\
e. изображения, разжигающие ненависть по любому признаку\n\
4. Запрещено размещение объявлений, содержащих рекламу других интернет-ресурсов (кроме imigo.me), использующих товарные знаки и бренды других компаний.\n\
5. Запрещено размещение объявлений о сомнительных способах получения дохода, в том числе в сети интернет.\n\
6. Недопустимо наличие в тексте объявления или имени пользователя эротического, порнографического, нецензурного или экстремистского содержания."},
    ];

    $scope.declineAd = function(ad){
        me = this;
        ngDialog.openConfirm({
          template: 'templates/ad-delete.html',
          className: 'ngdialog-theme-default',
          scope: this,
          data: ad
        }).then(function (reason) {
          Ad.update({}, {id: ad._id, 'accepted': false, reason: reason}, function() { me.deleteFromList(ad._id); });
        });
    };

    $scope.declineAdFast = function(ad) {
      me = this;
      reason = this.data_templates[0].text;
      Ad.update({}, {id: ad._id, 'accepted': false, reason: reason}, function() { me.deleteFromList(ad._id); });
    };

    $scope.declineAdLang = function(ad) {
      me = this;
    reason = "Вы указали не тот язык при создании объявления в категории " + $scope.category_lang_map[ad.language][ad.category]  + ".";
      Ad.update({}, {id: ad._id, 'accepted': false, reason: reason}, function() { me.deleteFromList(ad._id); });
    };

    $scope.reloadAds();

}).controller('AdsViewController',function($scope,$stateParams,Ad){
    $scope.ad=Ad.get({id:$stateParams.id});
});