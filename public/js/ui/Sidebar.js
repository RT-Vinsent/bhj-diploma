/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /** (2.1) (6)
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebarMini = document.querySelector('.sidebar-mini');
    let sidebarToggle = sidebarMini.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', function(event) {
      event.preventDefault();
      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse');
    });
  }

  /** (2.4) (9)
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector('.menu-item_register').addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('register').open();
    });

    document.querySelector('.menu-item_login').addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('login').open();
    });

    document.querySelector('.menu-item_logout').addEventListener('click', (event) => {
      event.preventDefault();
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
        }
      });
      
    });
  }
}