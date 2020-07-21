## Приложение задеплоено тут https://react-app-test-4f284.web.app/

### Задание

Средствами React реализуйте SPA приложение для заметок.
Каждая заметка имеет название и список задач - todos. Каждая отдельная задача состоит текстовой надписи и чекбокса.
Приложение состоит из двух страниц: главная и страница изменения заметки.
Главная страница - отображает список всех заметок. У каждой заметки отображается заголовок и список задач, задачи на данной странице доступны только read-only. Необходимо реализовать переход к созданию новой заметки (модальное окно), переход к изменению заметки, возможность удаления заметки (подтверждение удаления).
Страница изменения заметки должна реализовывать возможность редактирования открытой заметки, должна позволять отметить пункты задач и сохранение изменений.

Действия с заметкой:
  1. сохранение внесенных изменений
  2. удаление заметки (подтверждение удаления)
  3. отмена изменения с возвратам ко всем заметкам
  
Действия с задачами заметки:
  1. Добавить задачу
  2. Удалить задачу
  3. Редактировать текст задачи
  4. Отметить как выполненная
  
Требования к приложению:
  1. Действия должны происходить без перезагрузки страницы
  2. Подтверждения действий выполняются с помощью диалогового окна. Запрещено использовать alert, prompt, confirm.
  3. После перезагрузки страницы стейт элементов должен быть сохранен. Разрешено использовать redux и другие подобные технологии.
  4. В качестве языка можно использовать JavaScript или TypeScript.
  5. В качестве сборщика, если необходимо, можно использовать Webpack
  6. Верстка должны быть без использования UI библиотек
  7. Адаптивность не обязательна
  8. Логика должна быть разбита на разумное количество компонентов
