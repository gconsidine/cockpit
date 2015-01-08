'use strict';

describe('user.directive', function () {
  beforeEach(module('cockpit'));

  describe('logout()', function () {
    var $compile,
        $rootScope,
        State,
        User;

    beforeEach(inject(function(_$compile_, _$rootScope_, _State_, _User_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      State = _State_;
      User = _User_;
    }));

    it('should logout a user on mousedown of an element', function() {
      var element = $compile('<a logout></a>')($rootScope);

      $rootScope.$digest();
      
      spyOn(User, 'flush');
      spyOn(State, 'flush');

      element.triggerHandler('mousedown');

      expect(User.flush).toHaveBeenCalled();
      expect(State.flush).toHaveBeenCalled();
    });
  });
});
