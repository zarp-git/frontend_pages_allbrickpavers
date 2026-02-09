"use client";

import { Container } from "@/presentation/components/ui/container";
import { PrimaryButton } from "@/presentation/components/primary-button";
import {
  RiUserLine,
  RiBodyScanLine,
  RiPieChartLine,
  RiFileEditLine,
  RiHistoryLine,
} from "@remixicon/react";
import { cn } from "@/common/lib/utils";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import Link from "next/link";

type PricingPeriod = "monthly" | "semiannual" | "annual";

interface PlanProps {
  title: string;
  description: string;
  monthlyPrice: number;
  displayPrice: number;
  popular?: boolean;
  users: number;
  analyses: number;
  period: PricingPeriod;
  discount?: number;
  credits: number;
}

function PricingCard({
  title,
  description,
  monthlyPrice,
  displayPrice,
  popular,
  users,
  analyses,
  period,
  discount,
  credits,
}: PlanProps) {
  const periodSuffix = {
    monthly: "mês",
    semiannual: "mês",
    annual: "mês",
  };

  const periodText = {
    monthly: `O teste dá direito a ${credits} créditos. Após o período de 7 dias, será cobrada a mensalidade de R$${monthlyPrice
      .toFixed(2)
      .replace(".", ",")}.`,
    semiannual: `O teste dá direito a ${credits} créditos. Após o período de 7 dias, será cobrado o valor total de R$${(
      monthlyPrice * 6
    )
      .toFixed(2)
      .replace(
        ".",
        ",",
      )} a cada 6 meses (semestral com ${discount}% de desconto).`,
    annual: `O teste dá direito a ${credits} créditos. Após o período de 7 dias, será cobrado o valor total de R$${(
      monthlyPrice * 12
    )
      .toFixed(2)
      .replace(
        ".",
        ",",
      )} a cada 12 meses (anual com ${discount}% de desconto).`,
  };

  // Construir a URL de inscrição com o parâmetro do plano e período
  const signUpUrl = `https://app.pandami.com.br/auth/sign-up?plan=${encodeURIComponent(title.toLowerCase())}&period=${encodeURIComponent(period)}`;

  return (
    <div
      className={cn(
        // Base card style adaptado do código de referência
        "rounded-2xl bg-white dark:bg-neutral-950 p-6 flex flex-col relative",
        "border border-neutral-200 dark:border-neutral-800",
        "shadow-[0_4px_8px_0_rgba(0,0,0,0.02),0_15px_15px_0_rgba(0,0,0,0.02),0_34px_20px_0_rgba(0,0,0,0.01),0_60px_24px_0_rgba(0,0,0,0)]",
        popular &&
          "ring-1 ring-[hsl(var(--primary))] shadow-[0_20px_32px_-4px_hsl(var(--primary)/0.25)]",
      )}
    >
      {/* Badge 'Mais popular' com cor suave no tema */}
      {popular && (
        <div className="absolute top-3 right-3 rounded-full bg-primary/15 text-primary border border-primary/20 px-3 py-1 text-xs font-medium">
          Mais popular 🔥
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-200 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-tight">
          {description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            de R${monthlyPrice.toFixed(2).replace(".", ",")} por{" "}
            {periodSuffix[period]} ou
          </span>
        </div>
        <div className="flex items-baseline mt-1">
          <span className="text-3xl font-medium text-neutral-800 dark:text-neutral-100">
            R${displayPrice.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm ml-1">
            /por 7 dias de teste
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <RiUserLine className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            {users} {users === 1 ? "pessoa" : "pessoas"} na equipe
          </span>
        </div>

        <div className="flex items-center">
          <RiBodyScanLine className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            {analyses} análises de visagismo
          </span>
        </div>
        <div className="flex items-center">
          <RiPieChartLine className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            Dashboard profissional
          </span>
        </div>
        <div className="flex items-center">
          <RiFileEditLine className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            Anotações personalizadas
          </span>
        </div>
        <div className="flex items-center">
          <RiHistoryLine className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            Histórico de clientes
          </span>
        </div>
      </div>

      <Link href={signUpUrl} className="w-full mt-auto">
        <PrimaryButton className="w-full" size="lg">
          Começar por apenas R${displayPrice.toFixed(2).replace(".", ",")}
        </PrimaryButton>
      </Link>

      <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-4 text-center">
        {periodText[period]}
      </p>
    </div>
  );
}

export function PricingSection() {
  // Definir "annual" como valor inicial diretamente
  const [activePeriod, setActivePeriod] = useState<PricingPeriod>("annual");

  // Configurações de desconto por período
  const periodDiscounts = {
    monthly: 0, // Sem desconto no mensal
    semiannual: 10, // 10% de desconto no semestral
    annual: 20, // 20% de desconto no anual
  };

  // Preços base mensais (sem desconto)
  const basePrices = {
    STARTER: 49.9,
    PRO: 99.9,
    MAX: 189.9,
  };

  // Preços promocionais para o teste de 7 dias (atualizados para os valores exatos)
  const testPrices = {
    STARTER: 4.9,
    PRO: 9.9,
    MAX: 19.9,
  };

  // Função para calcular o preço com desconto, arredondando para o número inteiro mais próximo
  // e sempre terminando em 90 centavos
  const calculateDiscountedPrice = (
    basePrice: number,
    discountPercent: number,
  ) => {
    // Calcula o preço com desconto
    const rawDiscountedPrice = basePrice * (1 - discountPercent / 100);

    // Arredonda para o número inteiro mais próximo
    const roundedPrice = Math.round(rawDiscountedPrice);

    // Ajusta para terminar em 90 centavos (subtrai 0.10)
    return roundedPrice - 0.1;
  };

  // Planos com preços calculados dinamicamente baseado no desconto do período
  const plans = [
    {
      title: "STARTER",
      description:
        "Ideal para barbearias que não querem ficar para trás na tecnologia",
      users: 1,
      analyses: 30,
      credits: 3,
      get monthlyPrice() {
        return calculateDiscountedPrice(
          basePrices.STARTER,
          periodDiscounts[activePeriod],
        );
      },
      get displayPrice() {
        return testPrices.STARTER;
      },
      get discount() {
        return periodDiscounts[activePeriod];
      },
    },
    {
      title: "PRO",
      description:
        "Ideal para quem deseja ampliar serviços e oferecer experiências avançadas",
      users: 3,
      analyses: 60,
      credits: 7,
      popular: true,
      get monthlyPrice() {
        return calculateDiscountedPrice(
          basePrices.PRO,
          periodDiscounts[activePeriod],
        );
      },
      get displayPrice() {
        return testPrices.PRO;
      },
      get discount() {
        return periodDiscounts[activePeriod];
      },
    },
    {
      title: "MAX",
      description:
        "Ideal para barbearias que buscam o máximo de inovação e diferenciação",
      users: 9,
      analyses: 150,
      credits: 15,
      get monthlyPrice() {
        return calculateDiscountedPrice(
          basePrices.MAX,
          periodDiscounts[activePeriod],
        );
      },
      get displayPrice() {
        return testPrices.MAX;
      },
      get discount() {
        return periodDiscounts[activePeriod];
      },
    },
  ];

  const periodButtons: Array<{ id: PricingPeriod; label: string }> = [
    { id: "annual", label: "Anual" },
    { id: "semiannual", label: "Semestral" },
    { id: "monthly", label: "Mensal" },
  ];

  return (
    <section id="pricing" className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="flex flex-col items-center mb-3">
          <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4 text-stone-900">
            Planos profissionais
          </h2>

          {/* Tabs com defaultValue e value explicitamente definidos como "annual" */}
          <Tabs
            defaultValue="annual" // Adicionar defaultValue para garantir seleção inicial
            value={activePeriod}
            onValueChange={(v) => setActivePeriod(v as PricingPeriod)}
            className="flex flex-col items-center"
          >
            <TabsList className="mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 h-auto">
              {periodButtons.map((p) => (
                <TabsTrigger
                  key={p.id}
                  value={p.id}
                  className="relative rounded-full px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm data-[state=active]:text-neutral-800 dark:data-[state=active]:text-neutral-100 min-w-0"
                >
                  <div className="flex flex-row items-center gap-2">
                    <span className="whitespace-nowrap">{p.label}</span>
                    {periodDiscounts[p.id] > 0 && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-300/20 px-1.5 py-1.5 text-[9px] sm:text-[10px] md:text-[11px] font-medium leading-none">
                        {periodDiscounts[p.id]}% OFF
                      </span>
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              description={plan.description}
              monthlyPrice={plan.monthlyPrice}
              displayPrice={plan.displayPrice}
              users={plan.users}
              analyses={plan.analyses}
              popular={plan.popular}
              period={activePeriod}
              discount={plan.discount}
              credits={plan.credits}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
