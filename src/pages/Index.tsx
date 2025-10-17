import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  period?: 'week' | 'month' | 'forever' | 'once';
};

const nonRpEvents = [
  { name: 'Миссия "Ба-бах"', desc: 'Взрывное задание с таймером — успей обезвредить или всё полетит к чертям' },
  { name: 'Битва титанов', desc: 'Эпичные сражения сильнейших игроков за звание чемпиона' },
  { name: 'Волны SCP', desc: 'Бесконечные волны аномалий — выживи как можно дольше' },
  { name: 'Голодные игры', desc: 'Последний выживший получает всё — сражайся до конца' },
  { name: 'Дуэли', desc: 'Один на один — докажи своё превосходство в честном бою' },
  { name: 'Джаггернаут', desc: 'Один против всех — стань неудержимой машиной смерти' },
  { name: 'Куб', desc: 'Смертельный лабиринт с ловушками и загадками' },
  { name: 'Мафия', desc: 'Классическая игра в мафию с элементами SCP' },
  { name: 'Обычный раунд с дополнениями', desc: 'Знакомый режим с неожиданными поворотами' },
  { name: 'Ограбление банка', desc: 'Налёт на защищённый объект — грабь или защищай' },
  { name: 'Предатели', desc: 'Кто-то из вашей команды — предатель, найди его' },
  { name: 'Тюрьма', desc: 'Побег из охраняемой зоны или охота на беглецов' }
];

const rpEvents = [
  { name: 'Бункер', desc: 'Выживание в подземном убежище после катастрофы' },
  { name: 'Город', desc: 'Обычная жизнь в городе — работа, общение, повседневные дела' },
  { name: 'Суд', desc: 'Судебные разбирательства и вынесение приговоров' },
  { name: 'S.T.A.L.K.E.R.', desc: 'Исследование Зоны, артефакты и аномалии' },
  { name: 'Метро2033', desc: 'Жизнь в тоннелях метро после ядерной войны' },
  { name: 'Fallout', desc: 'Постапокалипсис в духе легендарной серии' }
];

const loreEvents = [
  { name: 'Операция Удар Молота', desc: 'Масштабная операция Фонда по зачистке объекта' },
  { name: 'Завод 45', desc: 'Расследование инцидента на засекреченном заводе' },
  { name: 'Законсервированная зона', desc: 'Проникновение в запечатанную аномальную зону' },
  { name: 'Заложники', desc: 'Спасательная операция по освобождению персонала' },
  { name: 'Инцидент с SCP-008', desc: 'Прорыв заражения — остановите эпидемию' },
  { name: 'Обычный день', desc: 'Рутина Фонда, которая идёт не по плану' },
  { name: 'Что это за место?', desc: 'Исследование неизвестной аномальной локации' }
];

const shopItems = [
  { 
    id: 1, 
    name: 'Prime', 
    prices: { week: 75, month: 200, forever: 400 },
    icon: 'Gem', 
    color: 'from-green-500 to-emerald-600',
    desc: 'Плашка Prime (зелёный), выбор ивента при голосовании если умер',
    features: ['Плашка "Prime" (Зелёный)', 'Выбор ивента на голосовании']
  },
  { 
    id: 2, 
    name: 'VIP', 
    prices: { week: 150, month: 350, forever: 600 },
    icon: 'Crown', 
    color: 'from-yellow-500 to-amber-600',
    desc: 'Плашка VIP (жёлтый), выбор ивента и роли на ивенте',
    features: ['Плашка "VIP" (Жёлтый)', 'Выбор ивента на голосовании', 'Выбор роли на ивенте']
  },
  { 
    id: 3, 
    name: 'Премиум', 
    prices: { week: 200, month: 400, forever: 850 },
    icon: 'Sparkles', 
    color: 'from-yellow-400 to-orange-500',
    desc: 'Плашка Премиум (золотой), выбор роли, доступ в админ чат',
    features: ['Плашка "Премиум" (Золотой)', 'Выбор ивента и роли', 'Доступ к админ чату']
  },
  { 
    id: 4, 
    name: 'Event Master', 
    prices: { week: 300, month: 600, forever: 1500 },
    icon: 'Wand2', 
    color: 'from-cyan-500 to-blue-600',
    desc: 'Донат ивент мастер, проведение ивентов, 2 голоса на выборе',
    features: ['Плашка "Донат. мастер" (Голубой)', 'Проведение ивентов', 'Выбор любой роли', '2 голоса за ивент']
  },
  { 
    id: 5, 
    name: 'Элита', 
    prices: { week: 450, month: 750, forever: 2000 },
    icon: 'Shield', 
    color: 'from-slate-700 to-slate-900',
    desc: 'Elite статус, полный админ доступ, проведение ивентов',
    features: ['Плашка "Elite" (Чёрный/Белый/Изумрудный)', 'Полный админ доступ', 'Проведение ивентов', 'Роль Elite в Discord', '2 голоса (можно за свой)']
  },
  { 
    id: 6, 
    name: 'Спонсор', 
    prices: { week: 1000, month: 2000, forever: 5000 },
    icon: 'Trophy', 
    color: 'from-red-600 to-rose-800',
    desc: 'Высший статус, выбор цвета роли, все привилегии',
    features: ['Плашка "Спонсор" (Чёрный/Красный)', 'Выбор цвета игровой роли', 'Роль Спонсор в Discord', 'Все привилегии Элиты', 'Отказ от ивент прав']
  },
  { 
    id: 7, 
    name: '100 Фэиров', 
    prices: { once: 100 },
    icon: 'Coins', 
    color: 'from-purple-500 to-pink-600',
    desc: 'Внутриигровая валюта для покупки эффектов смерти и кейсов',
    features: ['100 Фэиров = 100₽', 'Покупка эффектов смерти', 'Открытие кейсов', 'Разные плюшки']
  },
  { 
    id: 8, 
    name: '1000 Фэиров', 
    prices: { once: 1000 },
    icon: 'Coins', 
    color: 'from-purple-500 to-pink-600',
    desc: 'Большой набор внутриигровой валюты',
    features: ['1000 Фэиров = 1000₽', 'Покупка эффектов смерти', 'Открытие кейсов', 'Разные плюшки']
  },
  { 
    id: 9, 
    name: '2000 Фэиров', 
    prices: { once: 2000 },
    icon: 'Coins', 
    color: 'from-purple-500 to-pink-600',
    desc: 'Огромный набор внутриигровой валюты',
    features: ['2000 Фэиров = 2000₽', 'Покупка эффектов смерти', 'Открытие кейсов', 'Разные плюшки']
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('nonrp');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState<Record<number, 'week' | 'month' | 'forever' | 'once'>>({});

  const addToCart = (item: typeof shopItems[0], period?: 'week' | 'month' | 'forever' | 'once') => {
    const priceKey = period || 'once';
    const price = 'prices' in item ? (item.prices as any)[priceKey] : 0;
    const itemName = period ? `${item.name} (${period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : period === 'forever' ? 'Навсегда' : ''})` : item.name;
    
    setCart(prev => {
      const uniqueId = `${item.id}-${period}`;
      const existing = prev.find(i => i.id === item.id && i.period === period);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.period === period) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: itemName, price, quantity: 1, period }];
    });
  };

  const removeFromCart = (id: number, period?: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.period === period)));
  };

  const updateQuantity = (id: number, period: string | undefined, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id && i.period === period) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow animate-glow-pulse">
              <span className="text-2xl font-bold text-white">FE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">FairEx Project</h1>
              <p className="text-xs text-muted-foreground">SCP: Secret Laboratory</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="hover-scale">
              <Icon name="Users" size={18} className="mr-2" />
              Сервер
            </Button>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="hover-scale relative">
                  <Icon name="ShoppingCart" size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-3 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item, idx) => (
                        <div key={`${item.id}-${item.period}-${idx}`} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-sm text-primary">{item.price}₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.period, -1)}>
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.period, 1)}>
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id, item.period)}>
                              <Icon name="Trash2" size={14} className="text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice}₽</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                          <Icon name="CreditCard" size={18} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button className="bg-primary hover:bg-primary/90 hover-scale glow">
              <Icon name="Play" size={18} className="mr-2" />
              Играть
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="bg-secondary/20 text-secondary-foreground border-secondary px-4 py-1.5">
              Игровые Ивенты & События
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Добро пожаловать в
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mt-2">
                FairEx Project
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эпичные игровые события, уникальные ивенты и незабываемые приключения в мире SCP
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover-scale glow">
                <Icon name="Gamepad2" size={20} className="mr-2" />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="hover-scale" asChild>
                <a href="https://discord.gg/23enR9uqdD" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Уникальные Плагины</h3>
            <p className="text-muted-foreground">Технологии, которых нет больше нигде</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover-scale bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Icon name="Box" size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">MapX</h4>
              <p className="text-muted-foreground">Уникальный плагин для строительства, который даёт миллионы возможностей которых нет ни у кого!</p>
            </Card>

            <Card className="p-6 hover-scale bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <Icon name="Coins" size={24} className="text-secondary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Eco System</h4>
              <p className="text-muted-foreground">Уникальный плагин который добавляет Кейсы, экономику, кастомные смерти и другие плюшки которые получает как игроки так и администрация.</p>
            </Card>

            <Card className="p-6 hover-scale bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Icon name="Hand" size={24} className="text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-2">Custom Intractions</h4>
              <p className="text-muted-foreground">Дополнение к MapX, даёт возможность использовать двери, кнопки, лестницы по которым можно лазить, разбивать стёкла, поднимать кастомные схематики в руки и всё построенное билдерами!</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Наши Карты</h3>
            <p className="text-muted-foreground">Уникальные локации для незабываемых приключений</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover-scale cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Building2" size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-bold group-hover:text-primary transition-colors">Город</h4>
            </Card>

            <Card className="p-6 text-center hover-scale cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-bold group-hover:text-secondary transition-colors">Бункер</h4>
            </Card>

            <Card className="p-6 text-center hover-scale cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Sun" size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-bold group-hover:text-accent transition-colors">Обычный день</h4>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Игровые Ивенты</h3>
            <p className="text-muted-foreground">Выбери категорию и найди свой идеальный ивент</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="nonrp" className="text-base">
                <Icon name="Swords" size={18} className="mr-2" />
                Non-Rp ({nonRpEvents.length})
              </TabsTrigger>
              <TabsTrigger value="rp" className="text-base">
                <Icon name="Users" size={18} className="mr-2" />
                Rp ({rpEvents.length})
              </TabsTrigger>
              <TabsTrigger value="lore" className="text-base">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Lore ({loreEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nonrp" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nonRpEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover-scale cursor-pointer bg-card border-border hover:border-primary/50 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Icon name="Zap" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rp" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rpEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover-scale cursor-pointer bg-card border-border hover:border-secondary/50 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                        <Icon name="Drama" size={20} className="text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-secondary transition-colors">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lore" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loreEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover-scale cursor-pointer bg-card border-border hover:border-accent/50 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                        <Icon name="Scroll" size={20} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-accent transition-colors">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Магазин</h3>
            <p className="text-muted-foreground">Прокачай свой игровой опыт</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {shopItems.map((item) => {
              const selectedPeriod = selectedPeriods[item.id] || ('week' in item.prices ? 'week' : 'once');
              const currentPrice = (item.prices as any)[selectedPeriod];
              
              return (
                <Card key={item.id} className="p-6 hover-scale bg-card border-border hover:border-primary/50 transition-all group">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center glow-purple group-hover:glow transition-all`}>
                    <Icon name={item.icon as any} size={28} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-center">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 text-center min-h-[40px]">{item.desc}</p>
                  
                  <div className="space-y-2 mb-4">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {'week' in item.prices ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          size="sm" 
                          variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                          onClick={() => setSelectedPeriods(prev => ({ ...prev, [item.id]: 'week' }))}
                          className="text-xs"
                        >
                          Неделя
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                          onClick={() => setSelectedPeriods(prev => ({ ...prev, [item.id]: 'month' }))}
                          className="text-xs"
                        >
                          Месяц
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedPeriod === 'forever' ? 'default' : 'outline'}
                          onClick={() => setSelectedPeriods(prev => ({ ...prev, [item.id]: 'forever' }))}
                          className="text-xs"
                        >
                          Навсегда
                        </Button>
                      </div>
                      <p className="text-2xl font-bold text-primary text-center">{currentPrice}₽</p>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          addToCart(item, selectedPeriod);
                          setIsCartOpen(true);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-primary mb-4 text-center">{currentPrice}₽</p>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          addToCart(item, 'once');
                          setIsCartOpen(true);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">FE</span>
              </div>
              <span className="text-sm text-muted-foreground">© 2024 FairEx Project</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://discord.gg/23enR9uqdD" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Discord
                </a>
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Youtube" size={18} className="mr-2" />
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}