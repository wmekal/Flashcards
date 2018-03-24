﻿using Autofac;
using Flashcards.Infrastructure.Managers.Abstract;
using Flashcards.Infrastructure.Managers.Concrete;

namespace Flashcards.Infrastructure.Modules
{
    public class ManagerModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<EncryptionManager>().As<IEncryptionManager>().SingleInstance();
        }
    }
}