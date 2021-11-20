const headElem = document.getElementById("head");
const bodyElem = document.getElementsByClassName("body");
const headtextElem = document.getElementsByClassName("quiz__head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results1, results2, results3, results4, results5, results6, results7, results8)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results1 = results1;
		this.results2 = results2;
		this.results3 = results3;
		this.results4 = results4;
		this.results5 = results5;
		this.results6 = results6;
		this.results7 = results7;
		this.results8 = results8;

		//Количество набранных очков
		this.score1 = 0;
		this.score2 = 0;
		this.score3 = 0;
		this.score4 = 0;
		this.score5 = 0;
		this.score6 = 0;
		this.score7 = 0;
		this.score8 = 0;

		//Номер результата из массива
		this.result1 = 0;
		this.result2 = 0;
		this.result3 = 0;
		this.result4 = 0;
		this.result5 = 0;
		this.result6 = 0;
		this.result7 = 0;
		this.result8 = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		if ((this.current >= 1 && this.current <= 4)
			|| (this.current >= 33 && this.current <= 36) ||
			(this.current >= 65 && this.current <= 68) 
			|| (this.current >= 97 && this.current <= 100)) this.score1 += value;

		if ((this.current >= 5 && this.current <= 8)
			|| (this.current >= 37 && this.current <= 40) ||
			(this.current >= 69 && this.current <= 72) 
			|| (this.current >= 101 && this.current <= 104)) this.score2 += value;

		if ((this.current >= 9 && this.current <= 12)
			|| (this.current >= 41 && this.current <= 44) ||
			(this.current >= 73 && this.current <= 76) 
			|| (this.current >= 105 && this.current <= 108)) this.score3 += value;

		if ((this.current >= 13 && this.current <= 16)
			|| (this.current >= 45 && this.current <= 48) ||
			(this.current >= 77 && this.current <= 80) 
			|| (this.current >= 109 && this.current <= 112)) this.score4 += value;

		if ((this.current >= 17 && this.current <= 20)
			|| (this.current >= 49 && this.current <= 52) ||
			(this.current >= 81 && this.current <= 84) 
			|| (this.current >= 113 && this.current <= 116)) this.score5 += value;

		if ((this.current >= 21 && this.current <= 24)
			|| (this.current >= 53 && this.current <= 56) ||
			(this.current >= 85 && this.current <= 88) 
			|| (this.current >= 117 && this.current <= 120)) this.score6 += value;

		if ((this.current >= 25 && this.current <= 28)
			|| (this.current >= 57 && this.current <= 60) ||
			(this.current >= 89 && this.current <= 92) 
			|| (this.current >= 121 && this.current <= 124)) this.score7 += value;

		if ((this.current >= 29 && this.current <= 32)
			|| (this.current >= 61 && this.current <= 64) ||
			(this.current >= 93 && this.current <= 96) 
			|| (this.current >= 125 && this.current <= 128)) this.score8 += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}
	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results1.length; i++)
		{
			if(this.results1[i].Check(this.score1))
			{
				this.result1 = i;
			}
		}
		for(let i = 0; i < this.results2.length; i++)
		{
			if(this.results2[i].Check(this.score2))
			{
				this.result2 = i;
			}
		}
		for(let i = 0; i < this.results3.length; i++)
		{
			if(this.results3[i].Check(this.score3))
			{
				this.result3 = i;
			}
		}
		for(let i = 0; i < this.results4.length; i++)
		{
			if(this.results4[i].Check(this.score4))
			{
				this.result4 = i;
			}
		}
		for(let i = 0; i < this.results5.length; i++)
		{
			if(this.results5[i].Check(this.score5))
			{
				this.result5 = i;
			}
		}
		for(let i = 0; i < this.results6.length; i++)
		{
			if(this.results6[i].Check(this.score6))
			{
				this.result6 = i;
			}
		}
		for(let i = 0; i < this.results7.length; i++)
		{
			if(this.results7[i].Check(this.score7))
			{
				this.result7 = i;
			}
		}
		for(let i = 0; i < this.results8.length; i++)
		{
			if(this.results8[i].Check(this.score8))
			{
				this.result8 = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results1 = 
[
	new Result("Диктаторский, властный, деспотический характер, тип сильной личности, которая лидирует во всех видах групповой деятельности. Всех наставляет, поучает, во всем стремится полагаться на свое мнение, не умеет принимать советы других. Окружающие отмечают эту властность, но признают ее.", 13-16),
	new Result("Доминантный, энергичный, компетентный, авторитетный лидер, успешный в делах, любит давать советы, требует к себе уважения.", 9-12),
	new Result("Уверенный в себе человек, но не обязательно лидер, упорный и настойчивый.", 0-8)
];
const results2 = 
[
	new Result("Стремится быть над всеми, но одновременно в стороне от всех, самовлюбленный, расчетливый, независимый, себялюбивый. Трудности перекладывает на окружающих, но сам относится к ним несколько отчужденно, хвастливый, самодовольный, заносчивый.", 13-16),
	new Result("Эгоистические черты, ориентация на себя, склонность к соперничеству.", 0-12)
];
const results3 = 
[
	new Result("Жесткий и враждебный по отношению к окружающим, резкий, жесткий, агрессивность может доходить до асоциального поведения.", 13-16),
	new Result("Требовательный, прямолинейный, откровенный, строгий и резкий в оценке других, непримиримый, склонный во всем обвинять окружающих, насмешливый, ироничный, раздражительный.", 9-12),
	new Result("Упрямый, упорный, настойчивый и энергичный.", 0-8)
];
const results4 = 
[
	new Result("Отчужденный по отношению к враждебному и злобному миру, подозрительный, обидчивый, склонный к сомнению во всем, злопамятный, постоянно жалуется на всех (шизоидный тип характера).", 13-16),
	new Result("Критичный, испытывает трудности в интерперсональных контактах из-за подозрительности и боязни плохого отношения, замкнутый, скептичный, разочарованный в людях, скрытный, свой негативизм проявляет в вербальной агрессии.", 9-12),
	new Result("Критичный по отношению ко всем социальным явлениям и окружающим людям.", 0-8)
];
const results5 = 
[
	new Result("Покорный, склонный к самоуничижению, слабовольный, склонный уступать всем и во всем, всегда ставит себя на последнее место и осуждает себя, приписывает себе вину, пассивный, стремится найти опору в ком-либо более сильном.", 13-16),
	new Result("Застенчивый, кроткий, легко смущается, склонен подчиняться более сильному без учета ситуации.", 9-12),
	new Result("Скромный, робкий, уступчивый, эмоционально сдержанный, способный подчиняться, не имеет собственного мнения, послушно и честно выполняет свои обязанности.", 0-8)
];
const results6 = 
[
	new Result("Резко неуверенный, в себе, имеет навязчивые страхи, опасения, тревожится по любому поводу, поэтому зависим от других, от чужого мнения.", 13-16),
	new Result("Послушный, боязливый, беспомощный, не умеет проявить сопротивление, искренне считает, что другие всегда правы.", 9-12),
	new Result("Конформный, мягкий, ожидает помощи и советов, доверчивый, склонный к восхищению окружающими, вежливый.", 0-8)
];
const results7 = 
[
	new Result("Дружелюбный и любезный со всеми, ориентирован на принятие и социальное одобрение, стремится удовлетворить требования всех «быть хорошим» для всех без учета ситуации, стремится к целям микрогруппы, имеет развитые механизмы вытеснения и подавления, эмоционально лабильный (истероидный тип характера).", 9-16),
	new Result("Склонный к сотрудничеству, кооперации, гибкий и компромиссный при решении проблем и в конфликтных ситуациях, стремится быть в согласии с мнением окружающих, сознательно конформный, следует условностям, правилам и принципам «хорошего тона» в отношениях с людьми, инициативный энтузиаст в достижении целей группы, стремится помогать, чувствовать себя в центре внимания, заслужить признание и любовь, общительный, проявляет теплоту и дружелюбие в отношениях.", 0-8)
];
const results8 = 
[
	new Result("Гиперответственный, всегда приносит в жертву свои интересы, стремится помочь и сострадать всем, навязчивый в своей помощи и слишком активный по отношению к окружающим, неадекватно принимает на cебя ответственность за других (может быть только внешняя «маска», скрывающая личность противоположного типа).", 9-16),
	new Result("Ответственный по отношению к людям, деликатный, мягкий, добрый, эмоциональное отношение к людям проявляет в сострадании, симпатии, заботе, ласке, умеет подбодрить и успокоить окружающих, бескорыстный и отзывчивый.", 0-8)
];

//Массив с вопросами
const questions = 
[   
	new Question("1. Другие думают о нем благосклонно", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("2. Производит впечатление на окружающих", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("3. Умеет распоряжаться, приказывать", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("4. Умеет настоять на своем", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("5. Обладает чувством собственного достоинства", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("6. Независимый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("7. Способен сам позаботиться о себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("8. Может проявить безразличие", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("9. Способен быть суровым", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("10. Строгий, но справедливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("11. Может быть искренним", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("12. Критичен к другим", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("13. Любит поплакаться", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("14. Часто печален", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("15. Способен проявить недоверие", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("16. Часто разочаровывается", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("17. Способен быть критичным к себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("18. Способен признать свою неправоту", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("19. Охотно подчиняется", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("20. Уступчивый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("21. Благородный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("22. Восхищающийся и склонный к подражанию", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("23. Уважительный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("24. Ищущий одобрения", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("25. Способен к сотрудничеству", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("26. Стремятся ужиться с другими", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("27. Дружелюбный, доброжелательный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("28. Внимательный и ласковый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("29. Деликатный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("30. Одобряющий", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("31. Отзывчивый к призывам о помощи", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("32. Бескорыстный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("33. Способен вызвать восхищение", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("34. Пользуется уважением у других", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("35. Обладает талантом руководителя", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("36. Любит ответственность", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("37. Уверен в себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("38. Самоуверен и напорист", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("39. Деловит и практичен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("40. Любит соревноваться", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("41. Строгий и крутой, где надо", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("42. Неумолимый, но беспристрастный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("43. Раздражительный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("44. Открытый и прямолинейный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("45. Не терпит, чтобы им командовали", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("46. Скептичен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("47. На него трудно произвести впечатление", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("48. Обидчивый, щепетильный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("49. Легко смущается", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("50. Неуверен в себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("51. Уступчив", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("52. Скромный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("53.  Часто прибегает к помощи других", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("54. Очень почитает авторитеты", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("55. Охотно принимает советы", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("56. Доверчив и стремится радовать других", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("57. Всегда любезен в обхождении", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("58. Дорожит мнением окружающих", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("59. Общительный и уживчивый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("60. Добросердечный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("61. Добрый, вселяющий уверенность", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("62. Нежный и мягкосердечный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("63. Любит заботиться о других", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("64. Бескорыстный и щедрый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("65. Любит давать советы", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("66.  Производит впечатление значимости", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("67. Начальственно-повелительный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("68. Властный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("69. Хвастливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("70. Надменный и самодовольный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен",0)
	]),

	new Question("71. Думает только о себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("72. Хитрый и расчетливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("73. Нетерпим к ошибкам других", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("74. Своекорыстен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("75. Откровенный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("76. Часто недружелюбный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("77. Озлобленный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("78. Жалобщик", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("79. Ревнивый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("80. Долго помнит обиды", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),
	new Question("81. Склонный к самобичеванию", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("82. Застенчивый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("83. Безынициативный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("84. Кроткий", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("85. Завистливый, несамостоятельный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("86. Любит подчиняться", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("87. Предоставляет другим принимать решения", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("88. Легко попадает впросак", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("89. Легко попадает под влияние друзей", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("90. Готов доверится любому", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("91. Благорасположен ко всем без разбору", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("92. Всем симпатизирует", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("93. Прощает все", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("94. Переполнен чрезмерным сочувствием", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("95. Великодушен и терпим", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("96. Стремится покровительствовать", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("97. Стремится к успеху", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("98. Ожидает восхищения от каждого", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("99. Распоряжается другими", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("100. Деспотичен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("101. Сноб (судит о людях по рангу и достатку, а не по личным качествам)", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("102. Тщеславен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("103. Эгоистичен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("104. Холодный, черствый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("105. Язвительный, насмешливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("106. Злобный, жестокий", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("107. Часто гневливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("108. Бесчувственный, равнодушный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("109. Злопамятный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("110. Проникнут духом противоречия", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("111. Упрямый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("112. Недоверчивый, подозрительный", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),
	
	new Question("113. Робкий", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("114. Стыдливый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("115. Отличается чрезмерной готовностью подчиняться", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("116. Мягкотелый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("117. Почти никогда никому не возражает", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("118. Ненавязчивый", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("119. Любит, чтобы его опекали", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("120. Чрезмерно доверчив", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("121. Стремится снискать расположение каждого", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("122. Со всеми соглашается", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("123. Всегда дружелюбен", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("124. Всех любит", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("125. Слишком снисходителен к окружающим", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("126. Старается утешить каждого", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("127. Заботится о других в ущерб себе", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	]),

	new Question("128. Портит людей чрезмерной добротой", 
	[
		new Answer("+ Согласен", 1),
		new Answer("- Не согласен", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results1, results2, results3, results4, results5, results6, results7, results8);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{	
		bodyElem[0].style.backgroundImage = "url(https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80)";
		headtextElem[0].style.fontSize = "20px";
		headtextElem[0].style.marginLeft = "20px";
		headtextElem[0].style.marginTop = "110px";
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = "I. Авторитарный 16 / " + quiz.score1 + "<br/>" + quiz.results1[quiz.result1].text + "<br/>" + "II. Эгоистический 16 / " + quiz.score2 + "<br/>" + quiz.results2[quiz.result2].text + "<br/>" + "III. Агрессивный 16 / " + quiz.score3 + "<br/>" + quiz.results3[quiz.result3].text + "<br/>" + "IV. Подозрительный 16 / " + quiz.score4 + "<br/>" + quiz.results4[quiz.result4].text + "<br/>" + "V. Подчиняемый 16 / " + quiz.score5 + "<br/>" + quiz.results5[quiz.result5].text + "<br/>" + "VI. Зависимый 16 / " + quiz.score6 + "<br/>" + quiz.results6[quiz.result6].text + "<br/>"+ "VII. Дружелюбный 16 / " + quiz.score7 + "<br/>" + quiz.results7[quiz.result7].text + "<br/>" + "VIII. Альтруистический 16 / " + quiz.score8 + "<br/>" + quiz.results8[quiz.result8].text;
		pagesElem.innerHTML = "Ваши результаты: <br/> Типы отношения к окружающим";
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Ждём пол секунды и обновляем тест
	setTimeout(Update, 200);
}