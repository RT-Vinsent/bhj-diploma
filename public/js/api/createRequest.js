/** (1.1)
 * Основная функция для совершения запросов на сервер.
 **/

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest(); // создаём объект
    const method = options.method.toUpperCase(); // метод из завпроса в верхнем регистре
    let url = options.url; // переменная с ссылкой из запроса
    let formData; // переменаня для FormData

    if (options.data) { // если в запросе есть data
        if (options.method === 'GET') { // есть метод GET
            url += url.indexOf('?') >= 0 ? '&' : '?'; // добавляем ? или & в ссылку 
            for (let key in options.data) { // цикл по data
                url = url + `${key}=${options.data[key]}` + '&'; // добавляем данные в ссылку
            }
            url = url.slice(0, -1); // удаляем последний символ &
        } else { // если метод не GET
            formData = new FormData(); // присвоение объекта FormData
            for (let key in options.data) { // цикл по data
                formData.append(key, options.data[key]); // добавляем новое значение в FormData
            }
        }
    }

    try {
        xhr.responseType = 'json'; // формат, в котором необходимо выдать результат
        xhr.open(options.method, url); // создаём запрос
        options.method === 'GET' ? xhr.send() : xhr.send(formData); //отправляем запрос

        xhr.onload = function () { // когда доставки данных завершена.
            if (options.callback && xhr.status === 200) { // если есть callback и статус 200
                let response = xhr.response; // присвоение ответа response
                console.log(response);
        
                if (response && response.success) { // если есть response и response.success
                    options.callback(null, response); // функция колбека (успех)
                } else if (response && response.error) { // если есть response и response.error
                    options.callback(response.error, response); // функция колбека (ошибка)
                } 
            } 
        }
        xhr.onerror = () => { 
            options.callback(xhr.statusText, null);
        };

    } catch (err) { // Перехват ошибок
        if (options.callback) { // если есть callback
            options.callback(err); // функция колбека (ошибка)
        }
        console.error(err); // вывод ошибки в консоль
    }

    return xhr;
}