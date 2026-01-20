# Todo-приложение на React + Vite

## Введение

В этом проекте вы создадите полнофункциональное приложение для управления задачами (Todo-лист)

---

## Шаг 1: Создание проекта

### 1.1. Инициализация проекта с Vite

Откройте терминал и выполните команды:

```bash
npm create vite@latest
cd название_проекта
npm install
```

Vite — это современный инструмент для быстрой разработки. Он создаёт готовую структуру React-проекта.

### 1.2. Запуск dev-сервера

```bash
npm run dev
```

---

## Шаг 2: Подготовка структуры проекта

### 2.1. Очистка начальных файлов

Удалите следующие файлы (они нам не понадобятся):
- `src/App.css`
- `src/index.css`

### 2.2. Создание папки для компонентов

Создайте папку `src/components/`. Здесь будут храниться все наши компоненты.

### 2.3. Создание файлов компонентов

Создайте следующие пустые файлы в папке `src/components/`:
- `TodoForm.jsx` — форма для добавления новых задач
- `TodoList.jsx` — список всех задач
- `TodoItem.jsx` — отдельная задача
- `FilterButtons.jsx` — кнопки фильтрации

---

## Шаг 3: Настройка стилей

### 3.1. Создайте файл `src/index.css` и скопируйте туда следующий код:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#root {
  width: 100%;
  max-width: 600px;
}

.app-container {
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.app-title {
  text-align: center;
  color: #667eea;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.todo-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add {
  background: #667eea;
  color: white;
}

.btn-add:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.btn-filter {
  background: #f5f5f5;
  color: #333;
  padding: 8px 16px;
  font-size: 14px;
}

.btn-filter:hover {
  background: #e0e0e0;
}

.btn-filter.active {
  background: #667eea;
  color: white;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #999;
}

.btn-delete {
  background: #ff6b6b;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
}

.btn-delete:hover {
  background: #ee5a52;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}
```

---

## Шаг 4: Создание главного компонента App

### 4.1. Откройте `src/App.jsx` и очистите его содержимое

### 4.2. Импортируйте необходимые зависимости:

```jsx
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
```

### 4.3. Создайте основную структуру компонента:

```jsx
function App() {
  // TODO: Создайте стейт для хранения массива задач (todos)
  // Начальное значение должно быть пустым массивом
  
  // TODO: Создайте стейт для текущего фильтра (filter)
  // Начальное значение: 'all'

  // Функция для добавления новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Простой способ генерации уникального ID
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Функция для переключения статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Функция для удаления задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Фильтрация задач в зависимости от выбранного фильтра
  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos; // 'all'
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Мои задачи</h1>
      
      <TodoForm onAdd={addTodo} />
      
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={setFilter} 
      />
      
      <TodoList 
        todos={getFilteredTodos()} 
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
```

**Концепция:** Компонент App — это "главный мозг" приложения. Он хранит все данные (state) и передаёт их вниз дочерним компонентам через props.

---

## Шаг 5: Создание компонента TodoForm

### 5.1. Откройте `src/components/TodoForm.jsx`

```jsx
import { useState } from 'react';

function TodoForm({ onAdd }) {
  // TODO: Создайте стейт для хранения текста из поля ввода (inputValue)
  // Начальное значение - пустая строка

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // TODO: Добавьте проверку - если inputValue пустой (или только пробелы), ничего не делаем
    // Используйте метод trim() для удаления пробелов с краёв строки
    
    // TODO: Вызовите функцию onAdd с текстом задачи
    
    // TODO: Очистите поле ввода после добавления задачи
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Введите новую задачу..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;
```

**Концепция:** Это контролируемый компонент (Controlled Component). React контролирует значение input через state, что даёт нам полный контроль над данными формы.

**Подсказки:**
- **Для стейта:** Создайте переменную `inputValue` и функцию для её обновления
- **Для проверки:** Используйте условие `if` — если строка после `trim()` пустая, используйте `return` чтобы выйти из функции
- **Для очистки:** Вызовите функцию обновления стейта и передайте пустую строку

**Логика работы:**
1. Пользователь вводит текст → он сохраняется в `inputValue`
2. При отправке формы проверяем, что текст не пустой
3. Если всё ОК → вызываем `onAdd` и очищаем поле
4. Если текст пустой → ничего не делаем

---

## Шаг 6: Создание компонента FilterButtons

### 6.1. Откройте `src/components/FilterButtons.jsx`

```jsx
function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Завершённые' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.value}
          className={`btn btn-filter ${currentFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
```

**Концепция:** Условный рендеринг классов. Мы динамически добавляем класс `active` к кнопке, если её фильтр выбран. 

**Обратите внимание:**
- `${currentFilter === filter.value ? 'active' : ''}` — это тернарный оператор: если условие истинно, добавляется класс `active`, иначе — пустая строка
- Шаблонные строки (обратные кавычки) позволяют комбинировать статические и динамические части

---

## Шаг 7: Создание компонента TodoList

### 7.1. Откройте `src/components/TodoList.jsx`

```jsx
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <div className="empty-state">Нет задач. Добавьте новую!</div>;
  }

  return (
    <ul className="todo-list">
      {/* TODO: Используйте метод map для отображения всех задач */}
      {/* Для каждой задачи (todo) из массива todos создайте компонент TodoItem */}
      {/* Передайте в TodoItem следующие props: key, todo, onToggle, onDelete */}
    </ul>
  );
}

export default TodoList;
```

**Концепция:** Метод `map()` — основной способ рендеринга списков в React. Каждый элемент должен иметь уникальный `key` для оптимизации перерисовки.

**Подсказки:**
- **Структура map:** `массив.map(элемент => ( JSX код ))`
- **Key:** Используйте `todo.id` как значение для prop `key`
- **Props:** TodoItem нужны props: `todo` (весь объект задачи), `onToggle`, `onDelete`

**Пример похожей структуры (не точный код):**
```jsx
{users.map(user => (
  <UserCard key={user.id} user={user} onAction={handleAction} />
))}
```

---

## Шаг 8: Создание компонента TodoItem

### 8.1. Откройте `src/components/TodoItem.jsx`

```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      
      <button 
        className="btn btn-delete"
        onClick={() => onDelete(todo.id)}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;
```

**Концепция:** Этот компонент представляет отдельную задачу. Обратите внимание на условный рендеринг класса `completed` — он применяется только если `todo.completed === true`.

**Что здесь происходит:**
- Чекбокс связан с `todo.completed` — если задача выполнена, он отмечен
- При клике на чекбокс вызывается `onToggle` с ID задачи
- Класс `completed` добавляется к тексту, если задача выполнена (для зачёркивания)
- Кнопка удаления вызывает `onDelete` с ID задачи

---

## Шаг 9: Подключение стилей в main.jsx

### 9.1. Откройте `src/main.jsx` и убедитесь, что импортирован `index.css`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Шаг 10: Инициализация Capacitor

### 1. Установите зависимости для сборки Андроид приложения

В корне репозитория создайте файл `install-deps.sh` (по сути bat файл для bash)

```sh
#!/bin/bash

# Script to install Android build tools and Gradle in GitHub Codespaces
# This will set up everything needed to build Android APKs

set -e  # Exit on error

echo "=========================================="
echo "Android Build Environment Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install Java
echo -e "${YELLOW}[1/6] Installing Java JDK 21...${NC}"
sudo apt-get update -qq
sudo apt-get install -y openjdk-21-jdk wget unzip

# Verify Java installation
echo -e "${GREEN}✓ Java installed:${NC}"
/usr/lib/jvm/java-21-openjdk-amd64/bin/java -version
echo ""

# Step 2: Set up environment variables
echo -e "${YELLOW}[2/6] Setting up environment variables...${NC}"
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export ANDROID_HOME=$HOME/android-sdk
export PATH=$JAVA_HOME/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "JAVA_HOME=$JAVA_HOME"
echo "ANDROID_HOME=$ANDROID_HOME"
echo ""

# Step 3: Download Android Command Line Tools
echo -e "${YELLOW}[3/6] Downloading Android SDK Command Line Tools...${NC}"
mkdir -p $ANDROID_HOME/cmdline-tools
cd $ANDROID_HOME/cmdline-tools

# Download latest command line tools
wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
echo -e "${GREEN}✓ Downloaded${NC}"

# Unzip and organize
unzip -q commandlinetools-linux-9477386_latest.zip
mv cmdline-tools latest
rm commandlinetools-linux-9477386_latest.zip
echo -e "${GREEN}✓ Android SDK Command Line Tools installed${NC}"
echo ""

# Step 4: Accept licenses
echo -e "${YELLOW}[4/6] Accepting Android SDK licenses...${NC}"
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses > /dev/null 2>&1
echo -e "${GREEN}✓ Licenses accepted${NC}"
echo ""

# Step 5: Install required SDK components
echo -e "${YELLOW}[5/6] Installing Android SDK components...${NC}"
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0" > /dev/null 2>&1
echo -e "${GREEN}✓ SDK components installed${NC}"
echo ""

# Step 6: Add to bashrc for persistence
echo -e "${YELLOW}[6/6] Making environment variables permanent...${NC}"

# Check if already in bashrc
if ! grep -q "ANDROID_HOME" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Android SDK Environment Variables" >> ~/.bashrc
    echo "export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" >> ~/.bashrc
    echo "export ANDROID_HOME=\$HOME/android-sdk" >> ~/.bashrc
    echo "export PATH=\$JAVA_HOME/bin:\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools" >> ~/.bashrc
    echo -e "${GREEN}✓ Added to ~/.bashrc${NC}"
else
    echo -e "${GREEN}✓ Already in ~/.bashrc${NC}"
fi
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}✓ Installation Complete!${NC}"
echo "=========================================="
echo ""
echo "Installed components:"
echo "  - Java JDK 21"
echo "  - Android SDK Command Line Tools"
echo "  - Android Platform 33"
echo "  - Android Build Tools 33.0.0"
echo ""
echo "Next steps:"
echo "  1. Run: source ~/.bashrc"
echo "  2. In your Capacitor project, run:"
echo "     npm install"
echo "     npm run build"
echo "     npx cap add android"
echo "     npx cap sync android"
echo "     chmod +x android/gradlew"
echo "     cd android && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 ./gradlew assembleDebug"
echo ""
echo "Your APK will be at:"
echo "  android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "TIP: If you have multiple Java versions, always build with:"
echo "  JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 ./gradlew assembleDebug"
echo ""
```

Разрешите его исполнение и запустите

```sh
chmod u+x install-deps.sh
./install-deps.sh
```

Откройте новый шел для того, чтобы подтянуть изменения из скрипта и запустите команду, которая установит зависимости под Android SDK

```sh
sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

Также установите `capacitor/cli` на всю виртуальную машину, а не только в проект (поэтому используется флаг `-g`)

```sh
npm install -g @capacitor/cli
```

### 2. Установка зависимостей проекта

Внутри вашего проекта установите

```sh
npm install @capacitor/core @capacitor/cli
```

### 3. Работа с Capacitor

#### Инициализируйте Capacitor

```sh
npx cap init
```

Название пакета должно быть в формате `com.компания.название`

_Если название из двух слов, то используйте camelCase или snake_case_

#### Инициализируйте платформу

```sh
npx cap add android
```

_Для сборки ios нужен мак, поэтому собираем только android_

## Шаг 11: Сохранение данных с Capacitor Preferences

Сейчас при перезагрузке страницы все задачи исчезают

### Установка

```bash
npm install @capacitor/preferences
```

### Задача

Реализуйте сохранение и загрузку задач:

1. **При изменении списка задач** — сохраняйте их в Preferences
2. **При первой загрузке приложения** — загружайте задачи из Preferences

### Подсказки

**Сохранение данных:**

```jsx
export const setObject = async (key, value) => {
    await Preferences.set({
        key,
        value: JSON.stringify(value)
    })
}
```

**Загрузка данных:**

```jsx
export const getObject = async (key) => {
    const value = await Preferences.get({key: key})
    return JSON.parse(value.value)
}
```

**Когда сохранять и загружать:**
- Для автоматического сохранения при изменении стейта используйте хук `useEffect`
- Для загрузки данных при первом рендере тоже используйте `useEffect`

**Пример структуры useEffect для загрузки:**
```jsx
useEffect(() => {
  // Функция для загрузки данных
  const loadData = async () => {
    // Ваш код загрузки
  };
  
  loadData();
}, []); // Пустой массив зависимостей = выполнится один раз при монтировании
```

**Пример структуры useEffect для сохранения:**
```jsx
useEffect(() => {
  // Функция для сохранения данных
  const saveData = async () => {
    // Ваш код сохранения
  };
  
  saveData();
}, [todos]); // Выполнится каждый раз, когда изменится todos
```

*Добавьте логику сохранения/загрузки в компонент `App.jsx`, так как именно там находится стейт `todos`.*


## Шаг 12. Сборка Android приложения

#### Соберите проект (фронтовый)

```sh
npm run build
```

#### Синхронизируйте собранные файлы со сборкой нативный приложений

```sh
npx cap copy
```

#### Согласитель с условиями пользование Android SDK

```sh
yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME
```

Внутри папки с `android` приложением запустите сборщик APK

```sh
./gradlew assembleDebug
```

*Если выдает ошибку версии, то команда `JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 ./gradlew clean assembleDebug`*

### Скопируйте приложение в корень проекта и добавьте его в коммит

Приложение находится по пути `android/app/build/outputs/apk/debug/app-debug.apk`

_Вставьте его в корень репозитория и сделайте коммит, чтобы файл попал в коммит_

# Как сдавать

- Создайте форк репозитория в вашей организации с названием-этого-репозитория-вашафамилия
- Используя ветку wip сделайте задание
- Зафиксируйте изменения в вашем репозитории
- Когда документ будет готов - создайте пул реквест из ветки wip (вашей) на ветку main (тоже вашу) и укажите меня (ktkv419) как reviewer

Не мержите сами коммит, это сделаю я после проверки задания
