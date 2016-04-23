angular.module('indexApp', ['ngAnimate', 'ui.bootstrap']).controller('indedxController', ['$scope', function ($scope) {
  today()
  tomorrow()
  setOption()
  $scope.status = {
    isopen: false
  }
  $scope.reserv = reserv
  $scope.selectRoom = selectRoom
  $scope.room = {
    r1: [],
    r2: [],
    r3: [],
    r4: [],
    r5: [],
    r6: []
  }
  $scope.selectedRoom = 'r1'
  $scope.detail = {
    r1: [],
    r2: [],
    r3: [],
    r4: [],
    r5: [],
    r6: []
  }
  function today () {
    $scope.dt = new Date()
  }
  function tomorrow () {
    $scope.dt2 = new Date()
    $scope.dt2.setDate($scope.dt2.getDate() + 1)
  }
  function selectRoom (room) {
    $scope.selectedRoom = room
    setOption()
  }
  function reserv () {
    var firstDay = new Date($scope.dt.setHours(0, 0, 0, 0))
    var lastDay = new Date($scope.dt2.setHours(0, 0, 0, 0))
    var reservDate = []
    while (firstDay <= lastDay) {
      reservDate.push(new Date(firstDay))
      firstDay.setDate(firstDay.getDate() + 1)
    }
    if (checkValid(reservDate)) {
      for (var n = 0; n < reservDate.length;n++) {
        if ($scope.room[$scope.selectedRoom][createTimestamp(reservDate[n])]) {
          $scope.room[$scope.selectedRoom][createTimestamp(reservDate[n])].date = new Date(reservDate[n])
          $scope.room[$scope.selectedRoom][createTimestamp(reservDate[n])].status = 'full-day'
        } else {
          if (n === 0 || n === reservDate.length - 1) {
            var str
            if (n === 0) {
              str = 'in'
            } else {
              str = 'out'
            }
            $scope.room[$scope.selectedRoom][createTimestamp(reservDate[n])] = {
              date: new Date(reservDate[n]),
              status: 'half-day',
              inorout: str,
              cus: {
                name: $scope.cusName,
                tel: $scope.cusTel
              }
            }
          } else {
            $scope.room[$scope.selectedRoom][createTimestamp(reservDate[n])] = {
              date: new Date(reservDate[n]),
              status: 'full-day',
              cus: {
                name: $scope.cusName,
                tel: $scope.cusTel
              }
            }
          }
        }
        $scope.detail[$scope.selectedRoom].push({
          date: new Date(reservDate[n]).toDateString(),
          cus: {
            name: $scope.cusName,
            tel: $scope.cusTel
          }
        })
      }
    }
    setOption()
  }
  function createTimestamp (time) {
    return Math.round((new Date(time)).getTime() / 1000)
  }
  function checkValid (reservDate) {
    var count = 0
    return reservDate.every(function (rDate) {
      console.log(createTimestamp(rDate), rDate)
      if ($scope.room[$scope.selectedRoom][createTimestamp(rDate)]) {
        if ($scope.room[$scope.selectedRoom][createTimestamp(rDate)].status === 'half-day' && count < 1) {
          if ($scope.room[$scope.selectedRoom][createTimestamp(rDate)].inorout === 'in') {
            count++
          }
          return true
        } else {
          return false
        }
      } else {
        count = 0
        return true
      }
    })
  }
  function setOption () {
    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      dateDisabled: getDisable,
      showWeeks: true
    }
    $scope.options2 = {
      customClass: getDayClass,
      minDate: new Date(),
      dateDisabled: getDisable,
      showWeeks: true
    }
    today()
    tomorrow()
  }
  // $scope.events = [
  //   {
  //     date: tomorrow,
  //     status: 'full'
  //   },
  //   {
  //     date: afterTomorrow,
  //     status: 'partially'
  //   }
  // ]

  function getDayClass (data) {
    var date = data.date
    var mode = data.mode
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0)
      var keys = Object.keys($scope.room[$scope.selectedRoom])
      for (var n = 0; n < keys.length;n++) {
        var currentDay = new Date($scope.room[$scope.selectedRoom][keys[n]].date).setHours(0, 0, 0, 0)
        if (dayToCheck === currentDay) {
          return $scope.room[$scope.selectedRoom][keys[n]].status
        }
      }
    }
    return ''
  }
  function getDisable (data) {
    var date = data.date
    var mode = data.mode
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0)
      var keys = Object.keys($scope.room[$scope.selectedRoom])
      for (var n = 0; n < keys.length;n++) {
        var currentDay = new Date($scope.room[$scope.selectedRoom][keys[n]].date).setHours(0, 0, 0, 0)
        if (dayToCheck === currentDay && $scope.room[$scope.selectedRoom][keys[n]].status === 'full-day') {
          return $scope.room[$scope.selectedRoom][keys[n]].status
        }
      }
      return ''
    }
  }
}])
