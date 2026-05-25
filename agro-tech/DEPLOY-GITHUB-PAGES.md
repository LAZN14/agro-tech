# Публикация на GitHub Pages

Сайт будет доступен по адресу:

`https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПОЗИТОРИЯ/`

Имя репозитория должно совпадать с тем, что в URL (например репозиторий `agro-tech` → `https://user.github.io/agro-tech/`).

## 1. Создайте репозиторий на GitHub

- New repository → имя, например `agro-tech`
- **Не** добавляйте README при создании (проще первый push)

## 2. Залейте код

В PowerShell:

```powershell
cd "c:\Users\i7-14700\Desktop\test\agro-tech"
git init
git add .
git commit -m "Initial commit: agro-tech site"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/agro-tech.git
git push -u origin main
```

## 3. Включите GitHub Pages (обязательно!)

1. Репозиторий на GitHub → **Settings** → **Pages** (слева в блоке *Code and automation*)
2. **Build and deployment** → **Source:** выберите **GitHub Actions** (не «Deploy from a branch»)
3. Сохраните, если есть кнопка Save

Если в **Actions** сборка зелёная, а **deploy** красный — Pages ещё не включены. После шага 2 откройте **Actions** → последний run → **Re-run all jobs**.

## 4. Дождитесь деплоя

Ссылка появится в **Settings → Pages** и в логе workflow.

## 5. Локальная проверка (как на Pages)

```powershell
$env:GITHUB_REPOSITORY = "user/agro-tech"
npm run build:pages
npm run preview
```

Откройте URL из терминала (с путём `/agro-tech/`).

## Обновление сайта

```powershell
git add .
git commit -m "Update site"
git push
```

Через 1–2 минуты сайт обновится автоматически.

## Если репозиторий называется иначе

Путь на Pages = `/имя-репозитория/`. Переименуйте репозиторий на GitHub или создайте новый с нужным именем — менять код не нужно, `base` подставляется из `GITHUB_REPOSITORY` при сборке в Actions.
