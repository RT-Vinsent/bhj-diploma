/**  (3.5.2) (16)
   * Класс CreateTransactionForm управляет формой создания новой транзакции
   * */
class CreateTransactionForm extends AsyncForm {

  //Вызывает родительский конструктор и метод renderAccountsList
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, ( err, response ) => {

      if (response.success) {
        const select = this.element.querySelector('.accounts-select');
        select.innerHTML = '';

        for (let item of response.data) {
          select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        }
      }

    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход) с помощью Transaction.create.
   * По успешному результату вызывает App.update(), сбрасывает форму и 
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, ( err, response ) => {

      if (response.success) {
        this.element.reset();

        if (data.type === 'income') {
          App.getModal('newIncome').close();
        }

        if (data.type === 'expense') {
          App.getModal('newExpense').close();
        }

        App.update();
      }

    });
  }
}