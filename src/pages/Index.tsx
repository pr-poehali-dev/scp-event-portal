import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  period?: string;
}

const nonRpEvents = [
  'Миссия "Ба-бах"', 'Битва титанов', 'Волны SCP', 'Голодные игры',
  'Дуэли', 'Джаггернаут', 'Куб', 'Мафия',
  'Обычный раунд с дополнениями', 'Ограбление банка', 'Предатели', 'Тюрьма'
];

const rpEvents = [
  'Бункер', 'Город', 'Ледяной город', 'Суд',
  'S.T.A.L.K.E.R.', 'Метро2033', 'Fallout'
];

const loreEvents = [
  'Операция Удар Молота', 'Завод 45', 'Законсервированная зона',
  'Заложники', 'Инцидент с SCP-008', 'Обычный день', 'Что это за место?'
];

const shopItems = [
  {
    id: 1,
    name: 'VIP статус',
    type: 'subscription',
    color: 'from-blue-500 to-cyan-600',
    desc: 'Расширенные возможности на сервере',
    features: ['Доступ к VIP командам', 'Приоритет в очереди', 'Уникальный цвет ника', 'Особые эффекты'],
    prices: { week: 199, month: 599, forever: 1999 }
  },
  {
    id: 2,
    name: 'Premium статус',
    type: 'subscription',
    color: 'from-yellow-500 to-orange-600',
    desc: 'Максимум привилегий и возможностей',
    features: ['Все VIP возможности', 'Эксклюзивные скины', 'Персональные эффекты', 'Доступ к закрытым ивентам'],
    prices: { week: 399, month: 999, forever: 3499 }
  },
  {
    id: 3,
    name: 'Набор "Фэиров"',
    type: 'once',
    color: 'from-purple-500 to-pink-600',
    desc: 'Огромный набор внутриигровой валюты',
    features: ['2000 Фэиров = 2000₽', 'Покупка эффектов смерти', 'Открытие кейсов', 'Разные плюшки'],
    prices: { once: 2000 }
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('nonrp');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState<Record<number, 'week' | 'month' | 'forever' | 'once'>>({});
  const [showServerIP, setShowServerIP] = useState(false);
  const serverIP = '83.143.112.140:7778';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
  };

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
        const newQuantity = i.quantity + delta;
        return newQuantity > 0 ? { ...i, quantity: newQuantity } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  FairEx Project
                </h1>
                <p className="text-xs text-muted-foreground">SCP: Secret Laboratory</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog open={showServerIP} onOpenChange={setShowServerIP}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">IP Сервера</DialogTitle>
                    <DialogDescription>
                      Скопируйте адрес сервера и подключайтесь!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <code className="text-lg font-mono font-bold text-primary">{serverIP}</code>
                        <Button size="sm" onClick={copyToClipboard} className="ml-2">
                          <Icon name="Copy" size={16} className="mr-2" />
                          Копировать
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button className="bg-primary hover:bg-primary/90 hover-scale glow" onClick={() => setShowServerIP(true)}>
                <Icon name="Play" size={18} className="mr-2" />
                Играть
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
                        {cart.map((item) => (
                          <Card key={`${item.id}-${item.period}`} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-sm text-primary font-bold">{item.price}₽</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id, item.period)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.period, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.period, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </Card>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg">Итого:</span>
                            <span className="font-bold text-2xl text-primary">{totalPrice}₽</span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90 glow" size="lg">
                            <Icon name="CreditCard" size={18} className="mr-2" />
                            Перейти к оплате
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Icon name="Shield" size={14} className="mr-1" />
              SCP: Secret Laboratory
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient">
                FairEx Project
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эпичные игровые события, уникальные ивенты и незабываемые приключения в мире SCP
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover-scale glow" onClick={() => setShowServerIP(true)}>
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
            <h3 className="text-4xl font-bold mb-3">Игровые Ивенты</h3>
            <p className="text-muted-foreground text-lg">Присоединяйся к захватывающим событиям на сервере</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl">
                <TabsTrigger value="nonrp" className="text-base">
                  <Icon name="Swords" size={18} className="mr-2" />
                  Non-RP
                </TabsTrigger>
                <TabsTrigger value="rp" className="text-base">
                  <Icon name="Users" size={18} className="mr-2" />
                  RP
                </TabsTrigger>
                <TabsTrigger value="lore" className="text-base">
                  <Icon name="BookOpen" size={18} className="mr-2" />
                  Lore
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="nonrp" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nonRpEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-l-red-500">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Flame" size={20} className="text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Ивент «{event}»</h4>
                        <Badge variant="outline" className="text-xs">Non-RP</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rp" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rpEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-l-blue-500">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Drama" size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Ивент «{event}»</h4>
                        <Badge variant="outline" className="text-xs">RP</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lore" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loreEvents.map((event, idx) => (
                  <Card key={idx} className="p-5 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-l-purple-500">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Scroll" size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Ивент «{event}»</h4>
                        <Badge variant="outline" className="text-xs">Lore</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-3">Магазин</h3>
            <p className="text-muted-foreground text-lg">Получи преимущества на сервере</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {shopItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all">
                <div className={`h-32 bg-gradient-to-br ${item.color} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white text-2xl font-bold">{item.name}</h4>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {item.type === 'subscription' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        {(['week', 'month', 'forever'] as const).map((period) => (
                          <Button
                            key={period}
                            variant={selectedPeriods[item.id] === period ? 'default' : 'outline'}
                            size="sm"
                            className="text-xs"
                            onClick={() => setSelectedPeriods(prev => ({ ...prev, [item.id]: period }))}
                          >
                            {period === 'week' ? '7 дней' : period === 'month' ? '30 дней' : 'Навсегда'}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {item.prices[selectedPeriods[item.id] || 'week']}₽
                        </span>
                        <Button
                          onClick={() => addToCart(item, selectedPeriods[item.id] || 'week')}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{item.prices.once}₽</span>
                      <Button
                        onClick={() => addToCart(item, 'once')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold">FairEx Project</p>
                <p className="text-xs text-muted-foreground">SCP: Secret Laboratory Server</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://discord.gg/23enR9uqdD" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={20} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .hover-scale {
          transition: transform 0.2s;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .glow {
          box-shadow: 0 0 20px rgba(var(--primary), 0.3);
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-grid-white\/5 {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
