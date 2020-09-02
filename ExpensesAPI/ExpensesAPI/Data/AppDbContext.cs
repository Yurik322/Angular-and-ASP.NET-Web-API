﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ExpensesAPI.Models;

namespace ExpensesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("name=ExpensesDb")
        {
            
        }
        public DbSet<Entry> Entries { get; set; }
    }
}