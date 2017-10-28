



if (navigator.geolocation) {
    // 現在の位置情報取得を実施
    navigator.geolocation.getCurrentPosition(
        // 位置情報取得成功時
        function (pos) {

            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);

            var now = {lat: pos.coords.latitude, lng: pos.coords.longitude};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: now
            });
            var datamaster;

            $.ajax({
                type: "GET",
                url: "api/getData.php",
                data:{
                    lat:pos.coords.latitude,
                    lng:pos.coords.longitude
                },
                dataType: "json",
                success: function(data) {
                    //取得成功したら実行する処理
                    console.log("ajax get OK");

                    datamaster = data;

                    infoWindow = new Array(data.length);

                    data.forEach(function (val, index, arr) {
                        var marker = new google.maps.Marker({

                            //型を整えて代入
                            position: {lat: Number(val.lat_world), lng: Number(val.lng_world)},
                            map: map
                        });

                        marker.addListener('click', function(){
                            new google.maps.InfoWindow({
                                content : "<div id='infoWindow'>" + '<a href="' + val.url_pc + '" target="_blank">' + val.name + '</a>' + '<br />' +
                                '営業時間：' + val.open + '<br />' +
                                '定休日：' + val.close + '<br />' +
                                "<img src='" + val.url_photo_k1 + "'><div>"
                            }).open(map, marker);

                        });
                    });
                },
                error:function() {
                    //取得失敗時に実行する処理
                    console.log("ajax get NG");

                }
            });

            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            var nowMarker = new google.maps.Marker({
                position: {lat: pos.coords.latitude, lng: pos.coords.longitude},
                map: map,
                icon: image
            });

        },
        // 位置情報取得失敗時
        function (pos) {
            window.alert("位置情報が取得できませんでした");
        }
    );
} else {
    window.alert("本ブラウザではGeolocationが使えません");
}