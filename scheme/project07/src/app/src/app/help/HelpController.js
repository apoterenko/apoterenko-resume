export class HelpController {

	/*@ngInject*/
	constructor($scope, $language, $rootScope) {
		console.log('controller:', 'helpCtrl');

		$scope.user_lang = $language.getCurrentLanguage();

		var auto_id = 1;
		var questions_en = [
			{ id: auto_id++,
			  text: "What is IMIGO.ME?",
			  answer: "IMIGO.ME is a relationship market, the first website to allow you to trade your personal time. Here you can look for new friends, search for romance, or earn some money!"
			},
			{ id: auto_id++,
			  text: "How do I find a performer and buy relationships?",
			  answer: "To search for a performer, use the \"magnifying glass\" search icon above each of the categories. Enter a keyword and filter the performers by gender, age, or karma. Select an ad you like and click \"Discuss the deal\" at the bottom of the screen.Agree with the contractor on the conditions and confirm the deal with the \"Offer\" button."
			},
			{ id: auto_id++,
			  text: "How do I place an ad and find clients?",
			  answer: "Select a category on the main page and create an ad. Describe the services you are willing and able to provide in the \"ad text\" section and choose an appropriate photo. If you want to find a client yourself, click the magnifying glass icon in the desired category. Choose the ad of a prospective client and offer your services via live chat."
			},
			{ id: auto_id++,
			  text: "Can I really earn money on IMIGO.ME?",
			  answer: "Yes, that's right! You can exchange the IMI you earn for real money. "
			},
			{ id: auto_id++,
			  text: "What is Karma? How can I increase it?",
			  answer: "Karma is the measure of your reliability. Karma is calculated separately for each of the categories: Friendship, Romance and Professional. When you successfully complete deals, your karma increases. If any of the parties terminates the deal ahead of time, both parties' negative karma increases."
			},
			{ id: auto_id++,
			  text: "What actions are forbidden on IMIGO.ME?",
			  answer: "Any kind of threats, hate speech, publishing of offensive content and other people's confidential information are all offenses you will be banned for. Any other unlawful activities are prohibited as well. More information can be found in the \"Terms of Use\". If you are faced with a violation of the rules, please report it using the exclamation mark shaped button titled \"Report abuse\"."
			},
			{ id: auto_id++,
			  text: "What is IMI?",
			  answer: "IMI is IMIGO.ME virtual currency. 1 IMI equals 1 Euro. With IMI you can buy the services of other users and activate a Premium Account. IMI can be converted into real money."
			},
			{ id: auto_id++,
			  text: "What are the benefits of the Premium Account?",
			  answer: "Premium Account increases the visibility of your ads. Upon a user's search, your ad will be displayed in the special section above regular ads. Additionally, premium users can have five active deals or ads in each category at one time."
			},
			{ id: auto_id++,
			  text: "I made a payment, but my IMI balance did not fill up. What should I do?",
			  answer: "If you have received the successful payment confirmation from the payment system, but the balance has not changed, wait a while. If after 15 minutes, the balance has still not changed, please contact Support at support@imigo.me"
			},
			{ id: auto_id++,
			  text: "How can I withdraw the money I earned on IMIGO.ME?",
			  answer: "Go to the \"Bank\" menu, \"IMI Withdrawal\"section, enter the amount you want to withdraw and click the \"Withdraw\" button. Then you need to fill out information about your payment system account used to receive the money.  It may take up to 15 days to process your withdrawal request."
			},
			{ id: auto_id++,
			  text: "I have encountered a problem or have an idea how to improve IMIGO.ME. How can I contact you?",
			  answer: "We love hearing from you at support@imigo.me. Please contact us in case you have any problems."
			},
		]

		auto_id = 1;
		var questions_ru = [
			{ id: auto_id++,
			  text: "Что такое IMIGO.ME?",
			  answer: "IMIGO.ME - рынок взаимоотношений, первая площадка, которая позволяет торговать своим личным временем. Здесь вы сможете завести новых друзей, найти свою любовь и при этом заработать!"
			},
			{ id: auto_id++,
			  text: "Как заказать услугу и найти исполнителя?",
			  answer: "Чтобы подобрать исполнителя, воспользуйтесь поиском - иконкой \"лупы\" над каждой из категорий. Введите ключевое слово и отфильтруйте исполнителей по полу, возрасту или карме. Выберите понравившееся объявление и нажмите кнопку \"Обсудить сделку\" в нижней части экрана. Лично договоритесь с исполнителем об условиях и подтвердите сделку (кнопка \"Предложить\")"
			},
			{ id: auto_id++,
			  text: "Как стать исполнителем и найти заказ?",
			  answer: "Чтобы стать исполнителем, выберите категорию и создайте объявление. Расскажите о себе и своей услуге в поле \"текст объявления\", подберите подходящую фотографию. Если вы сами хотите найти заказ - на главной странице нажмите на значок лупы в нужной вам категории. Выберите интересное объявление Заказчика и предложите ему свои услуги через чат."
			},
			{ id: auto_id++,
			  text: "Получается, я могу заработать на imigo.me реальные деньги?",
			  answer: "Да, так и есть. Заработанные за заказы IMI вы можете обменять на реальные деньги."
			},
			{ id: auto_id++,
			  text: "Что такое карма? Как ее улучшить?",
			  answer: "Карма - оценка вашей надежности как партнера. Карма отдельно считается для каждой из категорий: Дружбы, Романтики и Работы. Когда вы успешно завершаете сделку, у вас возрастает положительная карма. Если любая из сторон досрочно расторгает сделку, то у обеих сторон увеличивается антикарма."
			},
			{ id: auto_id++,
			  text: "Чего нельзя делать на сайте?",
			  answer: "На сайте запрещено размещать угрозы и враждебные высказывания, оскорбительные материалы, личную информацию других пользователей. Кроме того, запрещена любая иная деятельность, преследуемая по закону. Более подробную информацию вы можете найти в \"Условиях использования\". Если вы столкнулись с нарушением правил, сообщите об этом, воспользовавшись функцией \"Отправить жалобу\"."
			},
			{ id: auto_id++,
			  text: "Что такое IMI?",
			  answer: "IMI - это внутренняя валюта сайта IMIGO.ME. 1 IMI равен 1 Евро. За IMI можно покупать услуги других пользователей на сайте и приобретать премиум аккаунт. Кроме того, IMI можно конвертировать в реальные деньги."
			},
			{ id: auto_id++,
			  text: "Что дает премиум аккаунт?",
			  answer: "Премиум аккаунт увеличивает заметность ваших объявлений в поиске (они будут показаны в специальном разделе). Кроме того, с премиумом можно иметь пять активных сделок или объявлений одновременно в каждой категории."
			},
			{ id: auto_id++,
			  text: "Я совершил платеж, но баланс IMI не увеличился, что делать?",
			  answer: "Если вы получили подтверждение успешного платежа от платежной системы, но баланс не изменился, подождите некоторое время. Если спустя 15 минут баланс останется неизменным, обратитесь в Службу поддержки: support@imigo.me."
			},
			{ id: auto_id++,
			  text: "Как вывести средства, заработанные в IMIGO.ME?",
			  answer: "В меню \"Банк\", в разделе \"Вывести IMI\" введите сумму, которую вы хотите вывести, и нажмите кнопку \"Вывести\". После этого нужно заполнить информацию о вашем интернет-кошельке, на который должны поступить деньги. Срок рассмотрения заявок на вывод средств - до 15 дней."
			},
			{ id: auto_id++,
			  text: "У меня возникла проблема или есть идея, как улучшить сайт. Как мне с вами связаться?",
			  answer: "Мы очень любим получать письма на адрес support@imigo.me. Напишите нам, если у вас возникла проблема!"
			},
		]

		auto_id = 1;
		var questions_jp = [
			{ id: auto_id++,
			  text: "IMIGO.MEとは何ですか？",
			  answer: "IMIGO.MEは相互関係の市場で、自由時間の販売という可能性を与えられる世界第一の場所です。ここでは新しい友達を作成し、恋愛を見つけながらお金が稼げます。"
			},
			{ id: auto_id++,
			  text: "サービスとか行為者をどうやって見つけられますか？",
			  answer: "行為者を見つけるように各カテゴリーの上にある「拡大鏡」アイコンを使用してください。次にキーワードを入力し、性別、年齢、カルマというパラメータで行為者を濾過してください。その後に気に入った広告を選択して、画面の下部にある「チャット」というをクリックするとメッセージの画面が開きます。相手と条件を話し合って、「提供する」というボタンをクリックすると取引を承知ができます。"
			},
			{ id: auto_id++,
			  text: "行為者になったら、注文をどうやって見つけられますか？",
			  answer: "行為者になる為ようにカテゴリーを選択すると広告を作成してください。広告本文というフィールドに自己紹介と貴方が提供するサービスを入力した後、適切な写真をアップロードしてください。自分で注文を見つけたい場合にはホームページで要求なカテゴリーの上にある「拡大鏡」アイコンをクリックしてください。気に入った広告を選択して、チャットに通してサービスを提供するのができます。"
			},
			{ id: auto_id++,
			  text: "ということはIMIGO.MEで正金が稼げますか？",
			  answer: "その通りです。稼いだIMIを正金に交換可能です。"
			},
			{ id: auto_id++,
			  text: "カルマとは何ですか？これをどうやって上げられますか？",
			  answer: "カルマとはパートナーとしてあなたの信頼できる度合いです。カルマは「友情、ロマンス、プロフェッショナル」の各カテゴリーでそれぞれに数えられます。取引を積極的に終えるとカルマが上昇します。取引を早期に終了する場合には両側の負のカルマが上昇します。"
			},
			{ id: auto_id++,
			  text: "このウエブサイトではどんなことが禁止されていますか？",
			  answer: "このウエブサイトには威嚇、憎悪の言葉、ＮＧ素材、他のユーザーの個人情報を掲載することは禁止されています。それより"
			},
			{ id: auto_id++,
			  text: "IMIとは何ですか？",
			  answer: "IMIとはIMIGO.MEの仮想通貨です。IMIを使って、他のユーザが提供するサービスとプレミアムアカウントを購入可能です。また、稼いだIMIを正金に交換ができます。"
			},
			{ id: auto_id++,
			  text: "プレミアムアカウントの利益は何ですか？",
			  answer: "プレミアムアカウントは貴方の広告を見かけやすくします。また、プレミアムアカウントは各カテゴリで同時に五つのアクティブな取引や広告を持つことができます。"
			},
			{ id: auto_id++,
			  text: "支払いして、残高が変化しなかった場合には、どうしたらいいでしょうか？",
			  answer: "ペイメントシステムから入金確認を受けるのに残高が変わらない場合には暫くお待ちください。もし１５分後残高がまだ変わらなかったら、サポートに送信してください。メール：support@imigo.me"
			},
			{ id: auto_id++,
			  text: "IMIGO.MEで稼いだお金をどうやって引き出せますか？",
			  answer: "「銀行」のメニューに「IMIの引き出し」という部分に引き出したい金額を入力すると、「引き出す」ボタンをクリックしてください。その後お金を振り込みしたいペイメントシステムの情報を書き込んでください。保安上の理由でお金の引出要求を処理するために15日がかかります。"
			},
			{ id: auto_id++,
			  text: "問題が起きて、改善すべき点が見かける場合にはIMIGO.MEとどうやって連絡できますか？",
			  answer: "問題が起きて、改善すべき点が見かける場合にはsupport@imigo.meに送信してください。"
			}
		]

		var MAP = {
			'en': questions_en,
			'jp': questions_jp,
			'ru': questions_ru
		};

		$scope.getData = function (question) {
			var lang = $language.getCurrentLanguage();
			return MAP[lang];
		};

		$scope.onSelectItem = function (question) {
			$scope.selectedQuestion = question;
		};
	}
}