import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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
  { id: 1, name: 'VIP Статус', price: '299₽', icon: 'Crown' },
  { id: 2, name: 'Донат Набор', price: '499₽', icon: 'Package' },
  { id: 3, name: 'Премиум Скин', price: '199₽', icon: 'Sparkles' },
  { id: 4, name: 'Особая Роль', price: '399₽', icon: 'Shield' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('nonrp');

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
              <Button size="lg" variant="outline" className="hover-scale">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Discord
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
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
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{event}</h4>
                        <p className="text-sm text-muted-foreground">Экшн и динамика</p>
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
                        <h4 className="font-semibold mb-1 group-hover:text-secondary transition-colors">{event}</h4>
                        <p className="text-sm text-muted-foreground">Ролевая игра</p>
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
                        <h4 className="font-semibold mb-1 group-hover:text-accent transition-colors">{event}</h4>
                        <p className="text-sm text-muted-foreground">Сюжетные миссии</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {shopItems.map((item) => (
              <Card key={item.id} className="p-6 text-center hover-scale cursor-pointer bg-card border-border hover:border-primary/50 transition-all group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-purple group-hover:glow transition-all">
                  <Icon name={item.icon as any} size={28} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                <p className="text-2xl font-bold text-primary mb-4">{item.price}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Купить
                </Button>
              </Card>
            ))}
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
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Discord
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
