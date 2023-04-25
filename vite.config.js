import { defineConfig } from 'vite';

export default defineConfig({
    // index.html の場所
    root: 'project/pages',
    // アセットなどのパスを変換するベースとなるパス
    // `/foo/` とすると `/foo/` 始まりのパスに変換される
    base: '/',
    // 静的ファイルの場所
    //  `public` を指定した場合 `<root>/public` が静的ファイルの格納場所になる
    publicDir: 'public',
    server: {
        // ルーティングを設定
        routes: [
            {
                path: 'test.html',
                // 表示するファイルを指定
                component: 'test.html'
            }
        ]
    }
});



