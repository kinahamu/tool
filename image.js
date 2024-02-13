 // 画像入力フィールド、画像プレビュー、画像情報表示領域、ダウンロードボタンの各要素を取得
 const imageInput = document.getElementById('imageInput');
 const imagePreview = document.getElementById('imagePreview');
 const imageInfo = document.getElementById('imageInfo');
 const downloadBtn = document.getElementById('downloadBtn');

 // 画像情報とファイル名（拡張子なし）を保持する変数の初期化
 let imageInfoText = '';
 let fileNameWithoutExtension = '';

 // 画像ファイルが選択された時のイベントリスナー
 imageInput.addEventListener('change', function(event) {
     const file = event.target.files[0]; // 選択されたファイルを取得
     if (file) {
         const fileName = file.name; // ファイル名を取得
         fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, ""); // 拡張子を除いたファイル名
         const fileType = file.type; // ファイルのタイプ（MIMEタイプ）
         const fileSize = (file.size / 1024 / 1024).toFixed(2); // ファイルサイズをMB単位で計算
         const reader = new FileReader(); // FileReaderオブジェクトを生成

         // ファイル読み込み完了時の処理
         reader.onload = function(e) {
             const image = new Image(); // 新しいImageオブジェクトを生成

             // 画像が読み込まれた時の処理
             image.onload = function() {
                 const width = this.width; // 画像の幅
                 const height = this.height; // 画像の高さ

                 // 画像情報のテキストを構築
                 imageInfoText = 
                     'ファイル名: ' + fileName + '\n' +
                     '形式: ' + fileType + '\n' +
                     '幅: ' + width + 'px\n' +
                     '高さ: ' + height + 'px\n' +
                     'サイズ: ' + fileSize + 'MB';
                 
                 // 画像情報を画面に表示
                 imageInfo.innerHTML = imageInfoText.replace(/\n/g, '<br>');
                 imagePreview.src = e.target.result; // プレビュー画像を設定
                 imagePreview.style.display = 'block'; // プレビューを表示
                 imageInfo.style.display = 'block'; // 画像情報を表示
                 downloadBtn.style.display = 'inline-block'; // ダウンロードボタンを表示
             };
             image.src = e.target.result; // 画像のURLを設定して読み込み開始
         };
         reader.readAsDataURL(file); // ファイルをDataURLとして読み込み
     }
 });

 // ダウンロードボタンがクリックされた時のイベントリスナー
 downloadBtn.addEventListener('click', function() {
     const blob = new Blob([imageInfoText], { type: 'text/plain' }); // テキストデータをBlobオブジェクトに変換
     const url = URL.createObjectURL(blob); // BlobからURLを生成
     downloadBtn.href = url; // ダウンロードリンクにURLを設定
     downloadBtn.download = fileNameWithoutExtension + '-解析結果.txt'; // ダウンロード時のファイル名を設定
 });

 // ページが読み込まれた時の処理
 document.addEventListener('DOMContentLoaded', function() {
     const topics = [
         "フリー素材、加工する際は二次利用を確認しましょう",
         "猫はkawaii",
         "規約のグレーゾーンは、あえてグレーにしてる場合もあるらしい"
     ];
     const selectedTopic = topics[Math.floor(Math.random() * topics.length)]; // ランダムなトピックを選択
     document.getElementById('topic').innerText = selectedTopic; // トピックを表示
 });